import { createClient } from "@supabase/supabase-js";

export type DbReview = {
  id: string;
  name: string;
  date: string;
  stars: number;
  text: string;
  hidden: boolean;
  verified: boolean;
  created_at: string;
  image_url?: string;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabaseConfigured =
  !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
