import { createClient } from '@supabase/supabase-js'
import { Database } from 'types_db'

export const adminSupabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_SERVICE_ROLE!,
)
