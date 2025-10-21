import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/lib/auth";
import { Admin } from "@/lib/supabase";
import { Shield, UserPlus, Users, ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuperAdminPanel = () => {
  const { admin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    password: "",
    role: "admin_viewer" as Admin['role']
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      const data = await authService.getAllAdmins();
      setAdmins(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load admins",
        variant: "destructive"
      });
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!admin?.id) return;

    setIsLoading(true);
    try {
      await authService.createAdmin(newAdmin, admin.id);
      toast({
        title: "Success",
        description: "Admin created successfully"
      });
      setNewAdmin({ username: "", password: "", role: "admin_viewer" });
      loadAdmins();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create admin",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAdmin = async (adminId: string, username: string) => {
    if (adminId === admin?.id) {
      toast({
        title: "Error",
        description: "Cannot delete your own account",
        variant: "destructive"
      });
      return;
    }

    if (window.confirm(`Are you sure you want to delete admin "${username}"? This action cannot be undone.`)) {
      try {
        await authService.deleteAdmin(adminId);
        toast({
          title: "Success",
          description: "Admin deleted successfully"
        });
        loadAdmins();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete admin",
          variant: "destructive"
        });
      }
    }
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'admin_editor': return 'Admin Editor';
      case 'admin_viewer': return 'Admin Viewer';
      default: return role;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'admin_editor': return 'bg-blue-100 text-blue-800';
      case 'admin_viewer': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (admin?.role !== 'super_admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">Only Super Admins can access this panel.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Super Admin Panel</h1>
          </div>
          <Button onClick={() => navigate('/admin-dashboard')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Admin Dashboard
          </Button>
        </div>

        {/* Create New Admin */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5" />
              <span>Create New Admin</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateAdmin} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Username"
                value={newAdmin.username}
                onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                required
              />
              <Select value={newAdmin.role} onValueChange={(value: Admin['role']) => setNewAdmin({...newAdmin, role: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin_viewer">Admin Viewer</SelectItem>
                  <SelectItem value="admin_editor">Admin Editor</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Admin"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Admins List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>All Admins</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((adminUser) => (
                  <TableRow key={adminUser.id}>
                    <TableCell className="font-medium">{adminUser.username}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(adminUser.role)}`}>
                        {getRoleDisplay(adminUser.role)}
                      </span>
                    </TableCell>
                    <TableCell>{adminUser.created_at ? new Date(adminUser.created_at).toLocaleDateString() : '-'}</TableCell>
                    <TableCell>{adminUser.last_login ? new Date(adminUser.last_login).toLocaleDateString() : 'Never'}</TableCell>
                    <TableCell>
                      {adminUser.id !== admin?.id && (
                        <Button
                          onClick={() => handleDeleteAdmin(adminUser.id!, adminUser.username)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminPanel;