/**
 * Sanitization utilities for preventing XSS attacks.
 * Strips HTML tags, script injections, and dangerous characters from user inputs.
 */

/** Remove HTML tags and encode special characters */
export function sanitizeString(input: string): string {
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

/** Sanitize a number input - returns 0 if invalid */
export function sanitizeNumber(input: unknown): number {
    const num = Number(input);
    if (isNaN(num) || !isFinite(num)) return 0;
    return num;
}

/** Sanitize an email address */
export function sanitizeEmail(input: string): string {
    if (typeof input !== 'string') return '';
    // Only allow valid email characters
    return input.replace(/[^a-zA-Z0-9@._\-+]/g, '').trim().toLowerCase();
}

/** Sanitize a phone number */
export function sanitizePhone(input: string): string {
    if (typeof input !== 'string') return '';
    // Only allow digits, +, -, spaces, and parentheses
    return input.replace(/[^0-9+\-() ]/g, '').trim();
}

/** Sanitize all string fields in an object */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
    const sanitized = { ...obj };
    for (const key in sanitized) {
        const value = sanitized[key];
        if (typeof value === 'string') {
            (sanitized as Record<string, unknown>)[key] = sanitizeString(value);
        }
    }
    return sanitized;
}
