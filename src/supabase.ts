
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or Anon Key');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Photo = {
    id: string;
    url: string;
    description: string | null;
    category: string | null;
    page: string | null;
    section: string | null;
    title: string | null;
    created_at: string;
};

export type FinancialStatement = {
    id: string;
    year: number;
    title: string;
    file_url: string;
    created_at: string;
};

export type Partner = {
    id: string;
    name: string;
    logo_url: string | null;
    website_url: string | null;
    created_at: string;
};

export type TeamMember = {
    id: string;
    name: string;
    role: string;
    bio: string | null;
    photo_url: string | null;
    social_linkedin: string | null;
    created_at: string;
};
