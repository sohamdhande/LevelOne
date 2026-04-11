// Rate limiter stubbed. New Supabase waitlist schema does not store IP hashes.
export async function isRateLimited(ipHash: string): Promise<boolean> {
    return false;
}
