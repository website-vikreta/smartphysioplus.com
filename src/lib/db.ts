import { createClient } from "@supabase/supabase-js";

// Write-only request log. Uses the service key, so this must only be imported from server code.
export function db() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
