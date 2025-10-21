import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Order {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  payment_method: string;
  product: string;
  quantity: number;
  created_at?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Admin {
  id?: string;
  username: string;
  password_hash?: string;
  role: 'super_admin' | 'admin_editor' | 'admin_viewer';
  created_by?: string;
  created_at?: string;
  last_login?: string;
}