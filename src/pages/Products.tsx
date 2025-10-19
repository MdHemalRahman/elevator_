import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-elevator.jpg";
import escalatorImage from "@/assets/escalator-modern.jpg";
import smartMonitoring from "@/assets/smart-monitoring.jpg";

const Products = () => {
  const products = [
    {
      name: "enta100",
      category: "Elevator Systems",
      tagline: "Efficiency Meets Innovation",
      price: "45,50,000 BDT",
      description: "The enta100 is our flagship elevator system designed for mid-rise buildings. With advanced energy-saving features and space-efficient design, it delivers exceptional performance while reducing operational costs.",
      image: "/assets/Images/photo-1565417814737-6b4097de8a3a.jpeg",
      features: [
        "Energy-efficient drive system",
        "Capacity up to 1,600 kg",
        "Speed up to 4 m/s",
        "Compact machine room design",
        "Advanced safety features",
        "Customizable cabin designs",
      ],
    },
    {
      name: "TWIN",
      category: "Revolutionary Systems",
      tagline: "Double the Efficiency",
      price: "12,00,000 BDT",
      description: "The TWIN system features two independent cabs operating in a single shaft, doubling transportation capacity without additional space. Perfect for high-traffic buildings seeking maximum efficiency.",
      image: "/assets/Images/pexels-pixabay-54581.jpg",
      features: [
        "Two cabs per shaft",
        "Up to 40% space savings",
        "Intelligent destination control",
        "Reduced waiting times",
        "Enhanced building value",
        "Sustainable design",
      ],
    },
    {
      name: "MAX Monitoring",
      category: "Smart Solutions",
      tagline: "Intelligence at Every Level",
      price: "25,000 BDT",
      description: "MAX is our comprehensive IoT-enabled monitoring platform that provides real-time insights into your vertical transportation systems. Predictive maintenance ensures maximum uptime and performance.",
      image: smartMonitoring,
      features: [
        "Real-time system monitoring",
        "Predictive maintenance alerts",
        "Performance analytics",
        "Remote diagnostics",
        "24/7 cloud connectivity",
        "Mobile app access",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            If you don't use our product, you know who will face the consequences.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {products.map((product, index) => (
            <div key={index} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 0 ? "" : "lg:order-2"}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-lg shadow-medium"
                  />
                </div>
                <div className={`space-y-4 ${index % 2 === 0 ? "" : "lg:order-1"}`}>
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {product.category}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">{product.name}</h2>
                  <p className="text-xl text-accent font-medium">{product.tagline}</p>
                  <p className="text-2xl font-bold text-primary mb-2">{product.price}</p>
                  <p className="text-muted-foreground text-lg">{product.description}</p>
                </div>
              </div>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button size="lg" onClick={() => window.open(`/checkout?product=${encodeURIComponent(product.name)}`, '_blank')}>Buy Now</Button>
              </div>

              {index < products.length - 1 && (
                <div className="border-t border-border pt-12"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
