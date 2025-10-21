import bcrypt from 'bcryptjs';
import { supabase, Admin } from './supabase';

export const authService = {
  async login(username: string, password: string) {
    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !admin) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, admin.password_hash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    await supabase
      .from('admins')
      .update({ last_login: new Date().toISOString() })
      .eq('id', admin.id);

    const { password_hash, ...adminData } = admin;
    return adminData;
  },

  async createAdmin(adminData: { username: string; password: string; role: Admin['role'] }, createdBy: string) {
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    
    const { data, error } = await supabase
      .from('admins')
      .insert({
        username: adminData.username,
        password_hash: hashedPassword,
        role: adminData.role,
        created_by: createdBy
      })
      .select()
      .single();

    if (error) throw error;
    
    const { password_hash, ...result } = data;
    return result;
  },

  async getAllAdmins() {
    const { data, error } = await supabase
      .from('admins')
      .select('id, username, role, created_at, last_login')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async deleteAdmin(adminId: string) {
    const { error } = await supabase
      .from('admins')
      .delete()
      .eq('id', adminId);

    if (error) throw error;
    return true;
  }
};