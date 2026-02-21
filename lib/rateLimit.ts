import { supabaseAdmin } from './supabase';

const MAX_SUBMISSIONS_PER_24H = 3;

export async function isRateLimited(ipHash: string): Promise<boolean> {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { count, error } = await supabaseAdmin
        .from('submissions')
        .select('*', { count: 'exact', head: true })
        .eq('ip_hash', ipHash)
        .gte('created_at', twentyFourHoursAgo);

    if (error) {
        console.error('Error checking rate limit:', error);
        // Fail closed or open? Let's fail open to ensure users can submit if our query fails, 
        // but log the error heavily. Or fail closed. Usually safer to fail open for generic errors.
        return false;
    }

    return (count !== null && count >= MAX_SUBMISSIONS_PER_24H);
}
