import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const AdminDatabase = () => {
  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin-login");
      return;
    }

    loadAllOrders();
  }, [navigate]);

  const loadAllOrders = () => {
    const ordersDatabase = localStorage.getItem("ordersDatabase");
    if (ordersDatabase) {
      const orders = JSON.parse(ordersDatabase);
      // Sort by date (newest first)
      orders.sort((a: Order, b: Order) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setAllOrders(orders);
    }
  };

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

  const getStatusStats = () => {
    const pending = allOrders.filter(o => o.status === 'pending').length;
    const confirmed = allOrders.filter(o => o.status === 'confirmed').length;
    const cancelled = allOrders.filter(o => o.status === 'cancelled').length;
    const totalRevenue = allOrders
      .filter(o => o.status === 'confirmed')
      .reduce((sum, order) => sum + calculateOrderTotal(order), 0);
    
    return { pending, confirmed, cancelled, totalRevenue };
  };

  const stats = getStatusStats();

  return (
    <div className="min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Orders Database</h1>
          <Button onClick={() => window.close()} variant="outline">
            Close
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending Orders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
              <div className="text-sm text-muted-foreground">Confirmed Orders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
              <div className="text-sm text-muted-foreground">Cancelled Orders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-primary">{formatPrice(stats.totalRevenue)}</div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </CardContent>
          </Card>
        </div>

        {/* All Orders */}
        <Card>
          <CardHeader>
            <CardTitle>All Orders History ({allOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {allOrders.length === 0 ? (
              <p className="text-muted-foreground">No orders in database.</p>
            ) : (
              <div className="space-y-4">
                {allOrders.map((order) => (
                  <Card key={order.id} className="border">
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

export default AdminDatabase;