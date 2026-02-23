import { createClient } from '@supabase/supabase-js';
import { sanitizeString, sanitizeNumber } from './lib/sanitize';

const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || ''
);

export default async function handler(req: any, res: any) {
    // CSRF check for mutating requests
    if (['POST', 'PUT', 'DELETE'].includes(req.method) && req.headers['x-requested-with'] !== 'XMLHttpRequest') {
        return res.status(403).json({ error: 'CSRF validation failed' });
    }

    // Auth check for all property management operations
    if (req.method !== 'GET') {
        const sessionToken = req.cookies?.session_token;
        if (!sessionToken || sessionToken !== process.env.SESSION_SECRET) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }

    // GET - Fetch all properties (public)
    if (req.method === 'GET') {
        try {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return res.status(200).json(data || []);
        } catch (error) {
            console.error('Error fetching properties:', error);
            return res.status(500).json({ error: 'Failed to fetch properties' });
        }
    }

    // POST - Add new property
    if (req.method === 'POST') {
        try {
            const body = req.body;
            const propertyData = {
                title: sanitizeString(body.title || ''),
                price: sanitizeNumber(body.price),
                location: sanitizeString(body.location || ''),
                type: body.type === 'rent' ? 'rent' : 'sale',
                category: ['apartment', 'villa', 'office', 'land'].includes(body.category) ? body.category : 'apartment',
                bedrooms: sanitizeNumber(body.bedrooms),
                bathrooms: sanitizeNumber(body.bathrooms),
                area: sanitizeNumber(body.area),
                description: sanitizeString(body.description || ''),
                features: Array.isArray(body.features) ? body.features.map(sanitizeString) : [],
                image: body.image && typeof body.image === 'string' ? body.image : 'https://picsum.photos/seed/new/800/600',
                show_price: body.showPrice !== false,
                property_number: sanitizeString(body.propertyNumber || ''),
                license_number: sanitizeString(body.licenseNumber || ''),
                sub_type: sanitizeString(body.subType || ''),
            };

            if (!propertyData.title || propertyData.title.length < 2) {
                return res.status(400).json({ error: 'عنوان العقار مطلوب' });
            }

            const { data, error } = await supabase
                .from('properties')
                .insert([propertyData])
                .select()
                .single();

            if (error) throw error;
            return res.status(201).json(data);
        } catch (error) {
            console.error('Error creating property:', error);
            return res.status(500).json({ error: 'Failed to create property' });
        }
    }

    // PUT - Update property
    if (req.method === 'PUT') {
        try {
            const body = req.body;
            const id = body.id;
            if (!id) return res.status(400).json({ error: 'ID is required' });

            const propertyData = {
                title: sanitizeString(body.title || ''),
                price: sanitizeNumber(body.price),
                location: sanitizeString(body.location || ''),
                type: body.type === 'rent' ? 'rent' : 'sale',
                category: ['apartment', 'villa', 'office', 'land'].includes(body.category) ? body.category : 'apartment',
                bedrooms: sanitizeNumber(body.bedrooms),
                bathrooms: sanitizeNumber(body.bathrooms),
                area: sanitizeNumber(body.area),
                description: sanitizeString(body.description || ''),
                features: Array.isArray(body.features) ? body.features.map(sanitizeString) : [],
                image: body.image && typeof body.image === 'string' ? body.image : 'https://picsum.photos/seed/new/800/600',
                show_price: body.showPrice !== false,
                property_number: sanitizeString(body.propertyNumber || ''),
                license_number: sanitizeString(body.licenseNumber || ''),
                sub_type: sanitizeString(body.subType || ''),
            };

            const { data, error } = await supabase
                .from('properties')
                .update(propertyData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return res.status(200).json(data);
        } catch (error) {
            console.error('Error updating property:', error);
            return res.status(500).json({ error: 'Failed to update property' });
        }
    }

    // DELETE - Remove property
    if (req.method === 'DELETE') {
        try {
            const id = req.query?.id || req.body?.id;
            if (!id) return res.status(400).json({ error: 'ID is required' });

            const { error } = await supabase
                .from('properties')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error deleting property:', error);
            return res.status(500).json({ error: 'Failed to delete property' });
        }
    }

    res.setHeader('Allow', 'GET, POST, PUT, DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
}
