import CompanionForm from "@/components/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { ArrowLeft, Sparkles, Crown, Zap } from "lucide-react";
import Link from "next/link";

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const canCreateCompanion = await newCompanionPermissions();

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-12">
        {/* Back Button */}
        <Link 
          href="/companions" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Library
        </Link>

        {canCreateCompanion ? (
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full px-4 py-2 bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Companion Builder
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Create Your Perfect
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Learning Companion
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Design a personalized AI tutor that matches your learning style, 
                subject preferences, and personality. Make learning engaging and effective.
              </p>
            </div>

            {/* Form */}
            <div className="card p-8 lg:p-12">
              <CompanionForm />
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center">
            {/* Limit Reached */}
            <div className="card p-12">
              <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Crown className="w-12 h-12 text-primary" />
              </div>
              
              <div className="inline-flex items-center rounded-full px-4 py-2 bg-primary/10 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Upgrade Required
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                You&apos;ve Reached Your
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Companion Limit
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                You&apos;ve created the maximum number of companions allowed on your current plan. 
                Upgrade to Pro to create unlimited companions and unlock premium features.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">Unlimited companions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">Advanced AI models</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">Priority support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">Export capabilities</span>
                </div>
              </div>

              <Link href="/subscription">
                <button className="btn-gradient text-lg px-8 py-4">
                  <Crown className="w-5 h-5 mr-2" />
                  Upgrade to Pro
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCompanion;