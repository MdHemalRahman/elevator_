import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  product: string;
  quantity: number;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

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

  const loadOrders = () => {
    const activeOrders = localStorage.getItem("orders");
    if (activeOrders) {
      setOrders(JSON.parse(activeOrders));
    }
  };

  const saveToDatabase = (order: Order) => {
    // Save to permanent database (all orders history)
    const allOrdersHistory = JSON.parse(localStorage.getItem("ordersDatabase") || "[]");
    const existingIndex = allOrdersHistory.findIndex((o: Order) => o.id === order.id);
    
    if (existingIndex >= 0) {
      allOrdersHistory[existingIndex] = order;
    } else {
      allOrdersHistory.push(order);
    }
    
    localStorage.setItem("ordersDatabase", JSON.stringify(allOrdersHistory));
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  };

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      const orderToCancel = orders.find(order => order.id === orderId);
      if (orderToCancel) {
        // Update order status to cancelled and save to database
        const cancelledOrder = { ...orderToCancel, status: 'cancelled' as const };
        saveToDatabase(cancelledOrder);
        
        // Remove from active orders
        const updatedOrders = orders.filter(order => order.id !== orderId);
        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        
        toast({
          title: "Order Cancelled",
          description: "The order has been cancelled and archived.",
        });
      }
    }
  };

  const handleConfirmOrder = (orderId: string) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        // Simulate sending confirmation email
        sendConfirmationEmail(order);
        const confirmedOrder = { ...order, status: 'confirmed' as const };
        // Save to database
        saveToDatabase(confirmedOrder);
        return confirmedOrder;
      }
      return order;
    });
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast({
      title: "Order Confirmed",
      description: "Confirmation email sent to customer.",
    });
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
                          <p><strong>Date:</strong> {order.date}</p>
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