import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { hashIp } from '@/lib/hash';
import { isRateLimited } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Extract fields including honeypot
        const {
            name,
            email,
            year_of_study,
            portfolio_problem,
            update_frequency,
            website_url // The honeypot field
        } = body;

        // Honeypot check (server-side protection)
        if (website_url) {
            // Silently accept bots without saving data
            return NextResponse.json({ success: true, message: "Submission received" }, { status: 200 });
        }

        if (!name || !email || !year_of_study) {
            return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
        }

        // IP processing
        const ip =
            req.headers.get('x-nf-client-connection-ip') ||
            req.headers.get('x-forwarded-for')?.split(',')[0] ||
            'unknown';
        const ipHash = hashIp(ip);
        const userAgent = req.headers.get('user-agent') || 'unknown';

        // Rate Limit Check
        const rateLimited = await isRateLimited(ipHash);
        if (rateLimited) {
            return NextResponse.json({ error: 'Too many submissions limit (3 per 24h) reached.' }, { status: 429 });
        }

        // Save to Waitlist Table
        const { error } = await supabase.from('waitlist').insert([
            {
                name,
                email,
                year_of_study,
                portfolio_problem,
                update_frequency
            }
        ]);

        if (error) {
            if (error.code === '23505') {
                return NextResponse.json({
                    error: "You're already on the early access list.",
                    isDuplicate: true
                }, { status: 409 });
            }
            console.error('Submissions Check DB Error:', error);
            return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Welcome to Switchfolio.' }, { status: 200 });

    } catch (err: any) {
        console.error('Submission API Error', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
