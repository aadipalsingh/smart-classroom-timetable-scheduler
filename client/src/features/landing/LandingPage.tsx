import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { 
  Calendar, 
  Users, 
  Building, 
  Clock, 
  Zap, 
  Shield, 
  BarChart3, 
  CheckCircle,
  ArrowRight,
  Star,
  PlayCircle,
  CalendarRange
} from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/shared/components/Logo";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      {/* Header/Navigation */}
      <header className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo size="md" variant="color" />
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            🚀 Revolutionize Your Academic Scheduling
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Smart Classroom &
            <span className="text-primary block">Timetable Scheduler</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Automate your academic scheduling with AI-powered timetable generation. 
            Optimize classroom allocation, faculty assignments, and create conflict-free schedules in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-8 py-3 text-lg">
                Try For Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-primary/20 hover:bg-primary/5">
              <PlayCircle className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-background rounded-2xl shadow-2xl p-8 border">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {Array.from({ length: 35 }, (_, i) => (
                  <div
                    key={i}
                    className={`h-12 rounded-lg flex items-center justify-center text-xs font-medium ${
                      i % 5 === 0 
                        ? 'bg-primary/10 text-primary' 
                        : i % 3 === 0 
                        ? 'bg-green-100 text-green-800' 
                        : i % 2 === 0 
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {i % 7 === 0 ? 'CS101' : i % 5 === 0 ? 'MATH' : i % 3 === 0 ? 'PHY' : ''}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                Generated in 2.3 seconds
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, manage, and optimize academic schedules with ease.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CalendarRange,
                title: "Timetable Generation",
                description: "Generate optimal timetables in seconds using advanced algorithms that consider all constraints and preferences.",
                color: "blue"
              },
              {
                icon: Users,
                title: "Faculty Management",
                description: "Manage faculty profiles, preferences, availability, and workload distribution efficiently.",
                color: "green"
              },
              {
                icon: Building,
                title: "Classroom Optimization",
                description: "Optimize classroom allocation based on capacity, equipment, and location requirements.",
                color: "purple"
              },
              {
                icon: Shield,
                title: "Conflict Resolution",
                description: "Automatically detect and resolve scheduling conflicts before they become problems.",
                color: "red"
              },
              {
                icon: BarChart3,
                title: "Analytics & Reports",
                description: "Get detailed insights into resource utilization, faculty workload, and scheduling efficiency.",
                color: "orange"
              },
              {
                icon: Clock,
                title: "Real-time Updates",
                description: "Make changes on the fly with instant updates and notifications for all stakeholders.",
                color: "teal"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Smart Scheduler?
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Built specifically for educational institutions, our platform combines cutting-edge technology 
                with deep understanding of academic scheduling challenges. We've helped hundreds of schools 
                and colleges streamline their scheduling process.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Save 90% of time spent on manual scheduling",
                  "Reduce scheduling conflicts by 95%",
                  "Optimize resource utilization by 40%",
                  "Improve faculty satisfaction with better workload distribution"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">500+</div>
                    <div className="text-blue-100">Institutions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50K+</div>
                    <div className="text-blue-100">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">99.9%</div>
                    <div className="text-blue-100">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="text-blue-100">Support</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900">4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Logo size="md" variant="light" />
              </div>
              <p className="text-gray-400">
                Revolutionizing academic scheduling with intelligent automation.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <ul>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 TimeNest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;