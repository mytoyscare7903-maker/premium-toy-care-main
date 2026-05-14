import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oflpmvdoctpefatynrto.supabase.co";

const supabaseAnonKey =
  "sb_publishable_dLyKzJkcdJXQzcdbdiIjiA_Z0Vm7Muy";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);