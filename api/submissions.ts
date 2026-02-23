import { createClient } from '@supabase/supabase-js';

// Inline sanitize functions (Vercel doesn't bundle shared files from subdirs)
function sanitizeString(input: string): string {
    if (typeof input !== 'string') return '';
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .trim();
}

function sanitizeNumber(input: unknown): number {
    const num = Number(input);
    if (isNaN(num) || !isFinite(num)) return 0;
    return num;
}

function sanitizeEmail(input: string): string {
    if (typeof input !== 'string') return '';
    return input.replace(/[^a-zA-Z0-9@._\-+]/g, '').trim().toLowerCase();
}

function sanitizePhone(input: string): string {
    if (typeof input !== 'string') return '';
    return input.replace(/[^0-9+\-() ]/g, '').trim();
}

const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || ''
);

// --- Rate Limiting ---
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // max requests per window
const RATE_WINDOW_MS = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
        return false;
    }
    entry.count++;
    return entry.count > RATE_LIMIT;
}

// --- Handler ---
export default async function handler(req: any, res: any) {
    // CSRF check
    if (req.method === 'POST' && req.headers['x-requested-with'] !== 'XMLHttpRequest') {
        return res.status(403).json({ error: 'CSRF validation failed' });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';

    if (req.method === 'GET') {
        // Require auth cookie for reading submissions
        const sessionToken = req.cookies?.session_token;
        if (!sessionToken || sessionToken !== process.env.SESSION_SECRET) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const { data, error } = await supabase
                .from('property_requests')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return res.status(200).json(data || []);
        } catch (error) {
            console.error('Error fetching submissions:', error);
            return res.status(500).json({ error: 'Failed to fetch submissions' });
        }
    }

    if (req.method === 'POST') {
        // Rate limit
        if (isRateLimited(clientIp)) {
            return res.status(429).json({ error: 'تم تجاوز الحد الأقصى للطلبات. يرجى المحاولة بعد دقيقة.' });
        }

        try {
            const body = req.body;

            // Determine if this is an interest form or ownership form
            const isInterest = body.type === 'interest';

            // Sanitize all inputs
            const sanitized = {
                name: sanitizeString(body.name || ''),
                email: sanitizeEmail(body.email || ''),
                employer: sanitizeString(body.employer || ''),
                job_title: sanitizeString(body.jobTitle || body.job_title || ''),
                age: sanitizeNumber(body.age),
                phone: sanitizePhone(body.phone || ''),
                has_joint_applicants: Boolean(body.hasJointApplicants || body.has_cosigner === 'yes'),
                joint_applicant_income: sanitizeNumber(body.jointApplicantIncome || body.cosigner_income || 0),
                property_type: sanitizeString(body.propertyType || body.property_title || ''),
                property_value: sanitizeNumber(body.propertyValue || 0),
                district: sanitizeString(body.district || ''),
                city: sanitizeString(body.city || ''),
                area: sanitizeNumber(body.area || 0),
                monthly_income: sanitizeNumber(body.monthlyIncome || body.income || 0),
                has_obligations: Boolean(body.hasObligations || body.has_commitments === 'yes'),
                obligation_amount: sanitizeNumber(body.obligationAmount || body.commitment_amount || 0),
                has_down_payment: Boolean(body.hasDownPayment || body.has_downpayment === 'yes'),
                down_payment_amount: sanitizeNumber(body.downPaymentAmount || body.downpayment_amount || 0),
                contact_method: sanitizeString(body.contactMethod || body.contact_method || ''),
            };

            // Basic validation
            if (!sanitized.name || sanitized.name.length < 2) {
                return res.status(400).json({ error: 'الاسم مطلوب' });
            }
            if (!sanitized.phone || sanitized.phone.length < 9) {
                return res.status(400).json({ error: 'رقم الجوال غير صالح' });
            }

            const { error } = await supabase
                .from('property_requests')
                .insert([sanitized]);

            if (error) throw error;
            return res.status(201).json({ success: true });
        } catch (error) {
            console.error('Error saving submission:', error);
            return res.status(500).json({ error: 'Failed to save submission' });
        }
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
}
