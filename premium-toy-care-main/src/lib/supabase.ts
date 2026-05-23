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

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. " +
    "Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in the .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
