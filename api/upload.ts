import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || ''
);

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // CSRF check
    if (req.headers['x-requested-with'] !== 'XMLHttpRequest') {
        return res.status(403).json({ error: 'CSRF validation failed' });
    }

    // Auth check
    const sessionToken = req.cookies?.session_token;
    if (!sessionToken || sessionToken !== process.env.SESSION_SECRET) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { file, fileName } = req.body;

        if (!file || !fileName) {
            return res.status(400).json({ error: 'File and fileName are required' });
        }

        // file is base64 encoded
        const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        // Determine content type
        const ext = fileName.split('.').pop()?.toLowerCase() || 'jpg';
        const contentTypeMap: Record<string, string> = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'webp': 'image/webp',
            'gif': 'image/gif',
        };
        const contentType = contentTypeMap[ext] || 'image/jpeg';

        // Generate unique filename
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
        const filePath = `properties/${uniqueName}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, buffer, {
                contentType,
                upsert: false,
            });

        if (uploadError) {
            console.error('Upload error:', uploadError);
            return res.status(500).json({ error: 'Failed to upload image' });
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        return res.status(200).json({ url: urlData.publicUrl });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: 'Upload failed' });
    }
}
