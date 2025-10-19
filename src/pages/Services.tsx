import { Wrench, RefreshCw, HeadphonesIcon, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Services = () => {
  const services = [
    {
      icon: Wrench,
      title: "Maintenance Services",
      description: "Comprehensive preventive maintenance programs designed to keep your vertical transportation systems running smoothly and safely.",
      features: [
        "Regular inspections and testing",
        "Preventive maintenance scheduling",
        "Parts replacement and upgrades",
        "Safety compliance checks",
        "Performance optimization",
        "Emergency callback service",
      ],
    },
    {
      icon: RefreshCw,
      title: "Modernization",
      description: "Upgrade your existing elevator systems with the latest technology to improve performance, efficiency, and aesthetics.",
      features: [
        "Controller and drive upgrades",
        "Cabin and door refurbishment",
        "Energy efficiency improvements",
        "Safety system updates",
        "Accessibility enhancements",
        "Design customization",
      ],
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Round-the-clock technical support and rapid response service to minimize downtime and ensure passenger safety.",
      features: [
        "24/7 emergency hotline",
        "Remote monitoring and diagnostics",
        "Rapid response teams",
        "Spare parts availability",
        "Technical consultation",
        "Customer portal access",
      ],
    },
    {
      icon: Clock,
      title: "Service Contracts",
      description: "Flexible maintenance contracts tailored to your specific needs, ensuring optimal performance and cost control.",
      features: [
        "Customizable service plans",
        "Predictable maintenance costs",
        "Priority service scheduling",
        "Extended warranty options",
        "Performance guarantees",
        "Annual service reviews",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            All-encompassing service options to ensure your vertical transport systems operate optimally during their entire lifespan. Or I don't care.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{service.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Services?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We deliver exceptional service quality backed by decades of experience and cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "99.9%", label: "System Uptime" },
              { number: "24/7", label: "Support Available" },
              { number: "13K+", label: "Services Provided" },
              { number: "<3hrs", label: "Avg Response Time" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Started with Professional Service
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Contact our service team to discuss your maintenance needs and get a customized service plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Request Service Quote</Button>
            <Button size="lg" variant="outline">Schedule Consultation</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
