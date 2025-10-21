import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase, Order } from "@/lib/supabase";



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

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin-login");
      return;
    }

    loadOrders();
  }, [navigate]);

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
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  };

  const handleCancelOrder = async (orderId: string) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        const { error } = await supabase
          .from('orders')
          .update({ status: 'cancelled' })
          .eq('id', orderId);

        if (error) throw error;

        await loadOrders();
        toast({
          title: "Order Cancelled",
          description: "The order has been cancelled.",
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
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'confirmed' })
        .eq('id', orderId);

      if (error) throw error;

      const order = orders.find(o => o.id === orderId);
      if (order) {
        sendConfirmationEmail(order);
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

  const sendConfirmationEmail = (order: Order) => {
    // Simulate email sending (in real app, this would call an email service)
    console.log(`
=== AUTOMATED CONFIRMATION EMAIL ===
To: ${order.email}
Subject: Order Confirmation - ${order.product}

Dear ${order.name},

Your order has been confirmed!

Order Details:
- Product: ${order.product}
- Quantity: ${order.quantity || 1}
- Order ID: ${order.id}
- Date: ${order.date}

We will contact you soon at ${order.phone} for delivery arrangements.

Thank you for choosing Elevate Mobility!

Best regards,
Elevate Mobility Team
=====================================`);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
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
                          <p><strong>Payment:</strong> {order.paymentMethod}</p>
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
                          >
                            Confirm Order
                          </Button>
                        )}
                        <Button 
                          onClick={() => handleCancelOrder(order.id)}
                          variant="destructive"
                          size="sm"
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