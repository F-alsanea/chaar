import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || ''
);

export default async function handler(req: any, res: any) {
    // GET - Fetch settings (public)
    if (req.method === 'GET') {
        try {
            const { data, error } = await supabase
                .from('settings')
                .select('*')
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            return res.status(200).json(data || { banner5_visible: false, banner5_image: '' });
        } catch (error) {
            console.error('Error fetching settings:', error);
            return res.status(200).json({ banner5_visible: false, banner5_image: '' });
        }
    }

    // PUT - Update settings
    if (req.method === 'PUT') {
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
            const { banner5_visible, banner5_image } = req.body;

            // Check if settings row exists
            const { data: existing } = await supabase
                .from('settings')
                .select('id')
                .single();

            let result;
            if (existing) {
                result = await supabase
                    .from('settings')
                    .update({
                        banner5_visible: banner5_visible ?? false,
                        banner5_image: banner5_image || '',
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', existing.id)
                    .select()
                    .single();
            } else {
                result = await supabase
                    .from('settings')
                    .insert([{
                        banner5_visible: banner5_visible ?? false,
                        banner5_image: banner5_image || '',
                    }])
                    .select()
                    .single();
            }

            if (result.error) throw result.error;
            return res.status(200).json(result.data);
        } catch (error) {
            console.error('Error updating settings:', error);
            return res.status(500).json({ error: 'Failed to update settings' });
        }
    }

    res.setHeader('Allow', 'GET, PUT');
    return res.status(405).json({ error: 'Method not allowed' });
}
