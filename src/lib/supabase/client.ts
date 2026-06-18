import { environment } from "@/config/environment"
import { createBrowserClient } from "@supabase/ssr"



export const createClient = () => createBrowserClient(
    environment.supabaseUrl!,
    environment.supabaseKey!
)