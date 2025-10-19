import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/escalator-modern.jpg";
import escalatorImage from "@/assets/hero-elevator.jpg";
import smartMonitoring from "@/assets/smart-monitoring.jpg";

const Index = () => {
  const solutions = [
    {
      title: "Elevators",
      description: "High-performance elevators designed for efficiency, comfort, and reliability in any building.",
      icon: TrendingUp,
    },
    {
      title: "Escalators & Moving Walks",
      description: "Seamless people flow solutions for retail, transit, and commercial spaces.",
      icon: Zap,
    },
    {
      title: "Smart Solutions",
      description: "IoT-enabled monitoring and predictive maintenance for optimal performance.",
      icon: Shield,
    },
  ];

  const products = [
    {
      name: "enta100",
      tagline: "The Future of Vertical Transportation",
      description: "Energy-efficient, space-saving elevator system for mid-rise buildings.",
      image: heroImage,
    },
    {
      name: "TWIN",
      tagline: "Two Cabs, One Shaft",
      description: "Revolutionary double-deck system that maximizes building efficiency.",
      image: escalatorImage,
    },
    {
      name: "MAX Monitoring",
      tagline: "Intelligence at Every Level",
      description: "Real-time analytics and predictive maintenance platform.",
      image: smartMonitoring,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/Images/pngtree-contemporary-3d-render-of-metal-elevator-design-concept-picture-image_5795333-1.png"
            alt="Contemporary 3D elevator design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 overlay-gradient"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in text-balance">
            Elevating Next Generation
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in text-balance">
            Smart vertical mobility solutions for modern buildings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button asChild size="lg" variant="default">
              <Link to="/products">
                Explore Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Vertical Mobility Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From elevators to escalators, we provide intelligent systems that move people safely and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="border-none shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <solution.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                  <p className="text-muted-foreground">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Innovation Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Innovation in Motion
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our latest product innovations designed to transform vertical transportation.
            </p>
          </div>

          <div className="space-y-12">
            {products.map((product, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center`}
              >
                <div className="flex-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover rounded-lg shadow-medium"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                    Featured Product
                  </div>
                  <h3 className="text-3xl font-bold">{product.name}</h3>
                  <p className="text-xl text-primary font-medium">{product.tagline}</p>
                  <p className="text-muted-foreground">{product.description}</p>
                  <Button asChild variant="outline">
                    <Link to="/products">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Elevate Your Building?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Get in touch with our experts to find the perfect solution for your project.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Request a Consultation</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
