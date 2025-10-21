import { supabase } from './supabase'

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('Supabase connection error:', error)
      return false
    }
    
    console.log('✅ Supabase connected successfully!')
    return true
  } catch (err) {
    console.error('Connection test failed:', err)
    return false
  }
}