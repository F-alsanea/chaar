import bcrypt from 'bcryptjs';

// --- Rate Limiting for Login ---
const loginAttempts = new Map<string, { count: number; resetTime: number }>();
const LOGIN_RATE_LIMIT = 3;
const LOGIN_WINDOW_MS = 60 * 1000; // 1 minute

function isLoginRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = loginAttempts.get(ip);
    if (!entry || now > entry.resetTime) {
        loginAttempts.set(ip, { count: 1, resetTime: now + LOGIN_WINDOW_MS });
        return false;
    }
    entry.count++;
    return entry.count > LOGIN_RATE_LIMIT;
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // CSRF check
    if (req.headers['x-requested-with'] !== 'XMLHttpRequest') {
        return res.status(403).json({ error: 'CSRF validation failed' });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';

    // Rate limit
    if (isLoginRateLimited(clientIp)) {
        return res.status(429).json({ error: 'تم تجاوز الحد الأقصى لمحاولات تسجيل الدخول. يرجى المحاولة بعد دقيقة.' });
    }

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'اسم المستخدم وكلمة المرور مطلوبان' });
        }

        // Validate username
        const adminUsername = process.env.ADMIN_USERNAME || 'thsfaisal';
        if (username !== adminUsername) {
            return res.status(401).json({ error: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
        }

        // Validate password against bcrypt hash stored in env
        const passwordHash = process.env.ADMIN_PASSWORD_HASH || '';
        const isValid = await bcrypt.compare(password, passwordHash);

        if (!isValid) {
            return res.status(401).json({ error: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
        }

        // Set secure HttpOnly cookie
        const sessionSecret = process.env.SESSION_SECRET || '';
        const isProduction = process.env.NODE_ENV === 'production';

        res.setHeader('Set-Cookie', [
            `session_token=${sessionSecret}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400${isProduction ? '; Secure' : ''}`
        ]);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'خطأ في الخادم' });
    }
}
