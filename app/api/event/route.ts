import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { hashIp } from '@/lib/hash';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { event_type, metadata = {} } = body;

        if (!event_type) {
            return NextResponse.json({ error: 'event_type is required' }, { status: 400 });
        }

        const ip =
            req.headers.get('x-nf-client-connection-ip') ||
            req.headers.get('x-forwarded-for')?.split(',')[0] ||
            'unknown';
        const ipHash = hashIp(ip);
        const userAgent = req.headers.get('user-agent');
        const sessionId = req.cookies.get('session_id')?.value;

        const enhancedMetadata = {
            ...metadata,
            page_id: 'landing_v1'
        };

        const { error } = await supabaseAdmin.from('events').insert([
            {
                event_type,
                metadata: enhancedMetadata,
                ip_hash: ipHash,
                user_agent: userAgent,
                session_id: sessionId
            }
        ]);

        if (error) {
            console.error('Events DB Error:', error);
            return NextResponse.json({ error: 'Failed to log event' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
    }
}
