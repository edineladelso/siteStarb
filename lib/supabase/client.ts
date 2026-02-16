import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnpnKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createSCClient() {
  return createBrowserClient(supabaseUrl!, supabaseAnpnKey!);
}
//SCClient = Supabase component client