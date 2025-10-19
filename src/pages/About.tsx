import { Target, Users, Award, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-elevator.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "Pioneering smart mobility solutions that shape the future of vertical transportation.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Delivering exceptional service and support to ensure complete customer satisfaction.",
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "Maintaining the highest standards in product design, manufacturing, and installation.",
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Committed to energy-efficient solutions that minimize environmental impact.",
    },
  ];

  const milestones = [
    { year: "1985", event: "Company founded with a vision to revolutionize vertical transportation" },
    { year: "2000", event: "Introduced our first IoT-enabled elevator monitoring system" },
    { year: "2010", event: "Launched the revolutionary TWIN double-deck elevator system" },
    { year: "2020", event: "Achieved carbon-neutral manufacturing operations" },
    { year: "2025", event: "Serving over 50,000 installations worldwide" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="About Elevate Mobility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 overlay-gradient"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Elevate Mobility</h1>
          <p className="text-xl text-white/90">
            Leading the future of vertical transportation since 1985
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            To develop new vertical mobility solutions that improve the way people live, work, and move in buildings globally. We use cutting-edge technology and sustainable techniques to create safe, efficient, and intelligent transportation systems.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="shadow-soft border-none">
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-bold">{milestone.year}</span>
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2"></div>
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-lg text-foreground">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "69K+", label: "Installations Worldwide" },
              { number: "100+", label: "Countries Served" },
              { number: "6969+", label: "Team Members" },
              { number: "40+", label: "Years of Excellence" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
