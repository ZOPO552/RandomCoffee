import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pmwwltufcvhmyukcstcq.supabase.co'; 
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtd3dsdHVmY3ZobXl1a2NzdGNxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjcwMTM4MiwiZXhwIjoyMDQ4Mjc3MzgyfQ.AAGnot8jupUQDhCEoV4PiVsLGm4I4beMN9HkCDyWCPQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
