/**
 * Instagram Graph API Service
 * 
 * Fetches the latest posts from a public Instagram Business/Creator account.
 * 
 * SETUP:
 * 1. Go to https://developers.facebook.com/ and create an app
 * 2. Add "Instagram Graph API" product
 * 3. Generate a User Access Token with `user_profile` and `user_media` permissions
 * 4. Convert it to a Long-Lived Token (lasts 60 days)
 * 5. Add the token to your .env file as VITE_INSTAGRAM_TOKEN
 */

export interface InstagramPost {
    id: string;
    caption?: string;
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    media_url: string;
    thumbnail_url?: string;
    permalink: string;
    timestamp: string;
    like_count?: number;
    comments_count?: number;
}

const INSTAGRAM_API_BASE = 'https://graph.instagram.com';

/**
 * Fetches the latest posts from the authenticated Instagram account.
 * @param limit Number of posts to fetch (default: 4)
 * @returns Array of Instagram posts
 */
export async function fetchInstagramPosts(limit: number = 4): Promise<InstagramPost[]> {
    const token = import.meta.env.VITE_INSTAGRAM_TOKEN;

    if (!token) {
        console.warn(
            '[Instagram Feed] No token configured. Add VITE_INSTAGRAM_TOKEN to your .env file.\n' +
            'See: https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/get-started'
        );
        return [];
    }

    try {
        const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
        const url = `${INSTAGRAM_API_BASE}/me/media?fields=${fields}&limit=${limit}&access_token=${token}`;

        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('[Instagram Feed] API Error:', errorData.error?.message || response.statusText);
            return [];
        }

        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('[Instagram Feed] Network error:', error);
        return [];
    }
}

/**
 * Refreshes a long-lived token before it expires (call every ~50 days).
 * Long-lived tokens last 60 days.
 * @returns New long-lived token string
 */
export async function refreshLongLivedToken(): Promise<string | null> {
    const token = import.meta.env.VITE_INSTAGRAM_TOKEN;
    if (!token) return null;

    try {
        const url = `${INSTAGRAM_API_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.access_token) {
            console.log('[Instagram Feed] Token refreshed successfully. Update your .env with the new token.');
            console.log('[Instagram Feed] New token:', data.access_token);
            return data.access_token;
        }

        return null;
    } catch (error) {
        console.error('[Instagram Feed] Token refresh failed:', error);
        return null;
    }
}
