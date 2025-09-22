import { SignUp } from '@clerk/nextjs'
import { Brain, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Join EduFlow</h1>
          <p className="text-muted-foreground">
            Create your account and start learning with AI
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="card p-8">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "btn-secondary w-full justify-center mb-3",
                formButtonPrimary: "btn-gradient w-full",
                formFieldInput: "input",
                footerActionLink: "text-primary hover:text-primary/80",
                identityPreviewText: "text-sm text-muted-foreground",
                formFieldLabel: "text-sm font-medium text-foreground mb-2",
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground text-sm",
              }
            }}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            Already have an account?{' '}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
