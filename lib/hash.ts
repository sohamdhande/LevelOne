import crypto from 'crypto';

/**
 * Creates a one-way SHA-256 hash of the provided IP address.
 * Uses a consistent fixed salt (the string 'level-one-salt') so the same IP 
 * hashes to the same value across requests to enforce rate limiting without 
 * storing raw IP addresses.
 */
export function hashIp(ip: string): string {
    return crypto
        .createHash('sha256')
        .update(ip + '-level-one-salt')
        .digest('hex');
}
