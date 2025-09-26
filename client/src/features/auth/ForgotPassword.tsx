import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { useToast } from "@/shared/hooks/use-toast"
import { Logo } from "@/shared/components/Logo"
import emailjs from '@emailjs/browser'

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  // EmailJS configuration - reads from environment variables
  const emailjsConfig = {
    serviceId: (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID || 'demo_service',
    templateId: (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID || 'demo_template',
    publicKey: (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY || 'demo_key'
  }

  const sendResetEmail = async (emailAddress: string) => {
    return new Promise(async (resolve, reject) => {
      // Set a timeout to prevent getting stuck
      const timeoutId = setTimeout(() => {
        reject(new Error('Email sending timeout - please try again'))
      }, 10000) // 10 second timeout

      try {
        console.log('EmailJS Config:', {
          serviceId: emailjsConfig.serviceId,
          templateId: emailjsConfig.templateId,
          publicKey: emailjsConfig.publicKey ? 'Set' : 'Not set'
        })

        const templateParams = {
          to_email: emailAddress, // Fix: Use the actual email address
          to_name: emailAddress.split('@')[0],
          reset_link: `${window.location.origin}/reset-password?token=demo_token_${Date.now()}`,
          app_name: 'TimeNest'
        }

        console.log('Sending email with params:', templateParams)

        const response = await emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          templateParams,
          emailjsConfig.publicKey
        )
        
        clearTimeout(timeoutId) // Clear timeout on success
        console.log('EmailJS Response:', response)
        resolve(true)
      } catch (error) {
        clearTimeout(timeoutId) // Clear timeout on error
        console.error('EmailJS Detailed Error:', error)
        reject(error)
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Basic validation
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }
    
    try {
      // Check if EmailJS is configured with real credentials
      if (emailjsConfig.serviceId !== 'demo_service' && 
          emailjsConfig.templateId !== 'demo_template' && 
          emailjsConfig.publicKey !== 'demo_key') {
        
        // Send real email
        await sendResetEmail(email)
        setIsEmailSent(true)
        toast({
          title: "Reset Email Sent!",
          description: "Check your email for password reset instructions",
        })
      } else {
        // Demo mode - simulate email sending
        setTimeout(() => {
          setIsEmailSent(true)
          toast({
            title: "Demo Mode - Email Simulated",
            description: "Configure EmailJS credentials in .env.local to send real emails",
          })
        }, 1000)
      }
    } catch (error: any) {
      console.error('Email sending error:', error)
      
      let errorMessage = "Failed to send reset email. Please try again."
      
      if (error.message && error.message.includes('timeout')) {
        errorMessage = "Request timeout - please check your internet connection and try again."
      } else if (error.text) {
        // EmailJS specific error
        if (error.text.includes('Invalid') || error.text.includes('not found')) {
          errorMessage = "EmailJS configuration error - please check your credentials."
        } else {
          errorMessage = `EmailJS Error: ${error.text}`
        }
      } else if (error.message) {
        errorMessage = error.message
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    setIsLoading(true)
    
    try {
      if (emailjsConfig.serviceId !== 'demo_service' && 
          emailjsConfig.templateId !== 'demo_template' && 
          emailjsConfig.publicKey !== 'demo_key') {
        
        // Send real email
        await sendResetEmail(email)
        toast({
          title: "Email Resent!",
          description: "Password reset email has been sent again",
        })
      } else {
        // Demo mode
        setTimeout(() => {
          toast({
            title: "Demo Mode - Resend Simulated",
            description: "Configure EmailJS to send real emails",
          })
        }, 800)
      }
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to resend email. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <Logo size="lg" variant="light" />
          </div>

          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Reset Your Password
          </h2>
          
          <p className="text-xl text-white text-opacity-90 mb-8 leading-relaxed">
            Enter your email address 
            and we'll send you instructions to reset your password.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <p className="text-white text-opacity-90">Secure password reset process</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <p className="text-white text-opacity-90">Email verification required</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <p className="text-white text-opacity-90">Quick and easy recovery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Button>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-900 rounded-xl flex items-center justify-center lg:hidden">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">
                {isEmailSent ? "Check Your Email" : "Forgot Password?"}
              </CardTitle>
              <CardDescription>
                {isEmailSent 
                  ? "We've sent password reset instructions to your email address"
                  : "Enter your email address and we'll send you a link to reset your password"
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {!isEmailSent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="transition-all duration-200 focus:shadow-sm"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full transition-all duration-200 shadow-md hover:shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending Email..." : "Send Reset Email"}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <Mail className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <p className="text-sm text-green-800">
                      Reset instructions have been sent to:
                    </p>
                    <p className="font-semibold text-green-900 mt-1">{email}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Didn't receive the email? Check your spam folder or
                    </p>
                    <Button 
                      variant="outline"
                      onClick={handleResendEmail}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? "Resending..." : "Resend Email"}
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <Link 
                      to="/login"
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Back to Login
                    </Link>
                  </div>
                </div>
              )}

              {!isEmailSent && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Remember your password?{" "}
                    <Link 
                      to="/login" 
                      className="text-primary hover:underline font-medium"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {!isEmailSent && (
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Having trouble? Contact support at support@college.edu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}