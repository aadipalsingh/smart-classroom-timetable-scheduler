import { useState } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { useToast } from "@/shared/hooks/use-toast"
import { useAuth } from "@/shared/contexts/AuthContext"
import { Logo } from "@/shared/components/Logo"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()
  const { login } = useAuth()

  // Get the intended destination or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Basic validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }
    
    // Simulate login delay
    setTimeout(() => {
      // Set authentication state
      login()
      
      toast({
        title: "Welcome back!",
        description: "Successfully logged into TimeNest",
      })
      
      // Navigate to intended destination
      navigate(from, { replace: true })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted to-muted/50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center p-6">
          <Link to="/" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Hero */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10" />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center px-12 text-white">
            <div className="flex items-center gap-3 mb-8">
              <Logo size="lg" variant="light" />
            </div>

            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Building Smarter Classrooms, One Schedule at a Time
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Automate timetable creation with AI-powered optimization. 
              Manage faculties, classrooms, and schedules effortlessly.
                </p>
              </div>
            </div>


        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center space-y-4 pb-8">
                <CardTitle className="text-3xl font-bold text-gray-900">Welcome Back</CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Sign in to access your timetable management dashboard
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@college.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary transition-all duration-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 pr-12 border-gray-200 focus:border-primary focus:ring-primary transition-all duration-200"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                      </Button>
                    </div>
                  </div>

                  <Button 
                  type="submit" 
                  className="w-full transition-all duration-200 shadow-md hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                </form>

                <div className="space-y-4">
                  <div className="text-center">
                    <Link to="/forgot-password">
                      <Button variant="link" className="text-primary hover:text-primary/80 font-medium">
                        Forgot your password?
                      </Button>
                    </Link>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-600">
                      Don't have an account?{" "}
                      <Link 
                        to="/signup" 
                        className="text-primary hover:text-primary/80 font-medium hover:underline transition-colors"
                      >
                        Sign up here
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg border border-primary/20">
                  <p className="text-sm text-primary text-center">
                    <strong>Demo credentials:</strong><br />
                    Email: admin@college.edu<br />
                    Password: password
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}