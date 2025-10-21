import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase, Order } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Shield } from "lucide-react";



const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);

  const getProductPrice = (productName: string) => {
    const prices: { [key: string]: number } = {
      "enta100": 4550000,
      "TWIN": 1200000,
      "MAX Monitoring": 25000,
    };
    return prices[productName] || 0;
  };

  const calculateOrderTotal = (order: Order) => {
    const price = getProductPrice(order.product);
    const quantity = order.quantity || 1;
    return price * quantity;
  };

  const formatPrice = (amount: number) => {
    return amount.toLocaleString() + " BDT";
  };

  const { admin, logout } = useAuth();

  useEffect(() => {
    if (!admin) {
      navigate("/admin-login");
      return;
    }
    loadOrders();
  }, [admin, navigate]);

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load orders.",
        variant: "destructive",
      });
    }
  };



  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  const handleCancelOrder = async (orderId: string) => {
    if (admin?.role === 'admin_viewer') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to modify orders.",
        variant: "destructive",
      });
      return;
    }

    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        const { error } = await supabase
          .from('orders')
          .update({ status: 'cancelled' })
          .eq('id', orderId);

        if (error) throw error;

        const order = orders.find(o => o.id === orderId);
        if (order) {
          await sendCancellationEmail(order);
        }

        await loadOrders();
        toast({
          title: "Order Cancelled",
          description: "Cancellation email sent to customer.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to cancel order.",
          variant: "destructive",
        });
      }
    }
  };

  const handleConfirmOrder = async (orderId: string) => {
    if (admin?.role === 'admin_viewer') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to modify orders.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'confirmed' })
        .eq('id', orderId);

      if (error) throw error;

      const order = orders.find(o => o.id === orderId);
      if (order) {
        await sendConfirmationEmail(order);
      }

      await loadOrders();
      toast({
        title: "Order Confirmed",
        description: "Confirmation email sent to customer.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to confirm order.",
        variant: "destructive",
      });
    }
  };

  const sendConfirmationEmail = async (order: Order) => {
    try {
      const { emailAPI } = await import('@/lib/emailAPI');
      await emailAPI.sendOrderConfirmation(order);
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      // Fallback to console log
      console.log(`
=== ORDER CONFIRMATION EMAIL ===
To: ${order.email}
Subject: Order Confirmed - ${order.product}
Status: Confirmed
===============================`);
    }
  };

  const sendCancellationEmail = async (order: Order) => {
    try {
      const { emailAPI } = await import('@/lib/emailAPI');
      await emailAPI.sendOrderCancellation(order);
    } catch (error) {
      console.error('Failed to send cancellation email:', error);
      // Fallback to console log
      console.log(`
=== ORDER CANCELLATION EMAIL ===
To: ${order.email}
Subject: Order Cancelled - ${order.product}
Status: Cancelled
===============================`);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {admin?.username} - {admin?.role === 'super_admin' ? 'Super Admin' : admin?.role === 'admin_editor' ? 'Admin Editor' : 'Admin Viewer'}
            </p>
          </div>
          <div className="flex gap-2">
            {admin?.role === 'super_admin' && (
              <Button onClick={() => navigate('/super-admin')} variant="secondary">
                Super Admin Panel
              </Button>
            )}
            <Button onClick={() => window.open('/admin-database', '_blank')} variant="secondary">
              View Database
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Orders ({orders.length})</CardTitle>
            {orders.length > 0 && (
              <p className="text-lg font-semibold text-primary">
                Total Revenue: {formatPrice(orders.reduce((sum, order) => sum + calculateOrderTotal(order), 0))}
              </p>
            )}
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-muted-foreground">No orders yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="border">
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p><strong>Name:</strong> {order.name}</p>
                          <p><strong>Email:</strong> {order.email}</p>
                          <p><strong>Phone:</strong> {order.phone}</p>
                          <p><strong>Product:</strong> <span className="text-primary font-medium">{order.product || 'Not specified'}</span></p>
                          <p><strong>Quantity:</strong> {order.quantity || 1}</p>
                          <p><strong>Total Amount:</strong> <span className="text-green-600 font-bold">{formatPrice(calculateOrderTotal(order))}</span></p>
                        </div>
                        <div>
                          <p><strong>Address:</strong> {order.address}</p>
                          <p><strong>Payment:</strong> {order.payment_method}</p>
                          <p><strong>Date:</strong> {new Date(order.created_at || '').toLocaleDateString()}</p>
                          <p><strong>Status:</strong> <span className={`font-medium ${
                            order.status === 'confirmed' ? 'text-green-600' : 
                            order.status === 'cancelled' ? 'text-red-600' : 'text-yellow-600'
                          }`}>{order.status || 'pending'}</span></p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        {(!order.status || order.status === 'pending') && (
                          <Button 
                            onClick={() => handleConfirmOrder(order.id)}
                            variant="default"
                            size="sm"
                            disabled={admin?.role === 'admin_viewer'}
                          >
                            Confirm Order
                          </Button>
                        )}
                        <Button 
                          onClick={() => handleCancelOrder(order.id)}
                          variant="destructive"
                          size="sm"
                          disabled={admin?.role === 'admin_viewer'}
                        >
                          Cancel Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;