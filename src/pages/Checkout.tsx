import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Checkout = () => {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
    quantity: "1",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    if (product) {
      setSelectedProduct(decodeURIComponent(product));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const order = {
      id: Date.now().toString(),
      ...formData,
      product: selectedProduct,
      quantity: parseInt(formData.quantity),
      date: new Date().toLocaleString(),
      status: 'pending' as const,
    };
    
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
    
    // Save to permanent database
    const ordersDatabase = JSON.parse(localStorage.getItem("ordersDatabase") || "[]");
    ordersDatabase.push(order);
    localStorage.setItem("ordersDatabase", JSON.stringify(ordersDatabase));
    
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. We'll contact you soon.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: "",
      quantity: "1",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Checkout</h1>
          <p className="text-xl text-muted-foreground">
            Complete your purchase by filling out the form below.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-2xl">Purchase Information</CardTitle>
              {selectedProduct && (
                <div>
                  <p className="text-lg text-primary font-medium">Product: {selectedProduct}</p>
                  <p className="text-sm text-muted-foreground">Quantity: {formData.quantity}</p>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+(880) 1234-567890"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Address *
                  </label>
                  <Input
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Your complete address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="quantity" className="text-sm font-medium">
                      Quantity *
                    </label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      max="100"
                      required
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="paymentMethod" className="text-sm font-medium">
                      Payment Method *
                    </label>
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      required
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="">Select Payment Method</option>
                      <option value="credit-card">Credit Card</option>
                      <option value="debit-card">Debit Card</option>
                      <option value="bank-transfer">Bank Transfer</option>
                      <option value="mobile-banking">Mobile Banking</option>
                    </select>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Complete Purchase
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;