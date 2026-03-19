import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://zrexucomymiqmddvaqyp.supabase.co"
const supabaseKey = "sb_publishable_5IDgkCcsbe4ASh-fWVQzxA_FK10cS38"

export const supabase = createClient(supabaseUrl, supabaseKey)
