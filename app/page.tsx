import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { getAllCompanions, getRecentSessions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { BookOpen, Brain, Zap, Users, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  const companions = await getAllCompanions({ limit: 4 });
  const recentSessionsCompanions = await getRecentSessions(6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center rounded-full px-4 py-2 bg-primary/10 text-primary text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Learning Revolution
            </div>
            
            <h1 className="mb-6">
              Master Any Subject with Your
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Personal AI Tutor
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience personalized learning through natural conversations with AI companions 
              that adapt to your learning style and pace.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/companions/new">
                <button className="btn-gradient text-lg px-8 py-4 group">
                  Start Learning Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/companions">
                <button className="btn-secondary text-lg px-8 py-4">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Library
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="mb-4">Why Choose EduFlow?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of education with our cutting-edge AI technology
            </p>
          </div>
          
          <div className="feature-grid">
            <div className="feature-card animate-slide-up">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Personalized Learning</h3>
              <p className="text-muted-foreground">
                AI companions that adapt to your learning style, pace, and preferences for maximum effectiveness.
              </p>
            </div>
            
            <div className="feature-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Natural Conversations</h3>
              <p className="text-muted-foreground">
                Learn through engaging voice conversations that feel natural and interactive.
              </p>
            </div>
            
            <div className="feature-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Knowledge</h3>
              <p className="text-muted-foreground">
                Access comprehensive knowledge across multiple subjects with expert-level accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Companions */}
      <section className="py-24">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="mb-4">Popular Learning Companions</h2>
              <p className="text-muted-foreground">
                Start your learning journey with our most popular AI tutors
              </p>
            </div>
            <Link href="/companions">
              <button className="btn-ghost">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </Link>
          </div>
          
          <div className="companion-grid">
            {companions.map((companion, index) => (
              <div 
                key={companion.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CompanionCard
                  {...companion}
                  color={getSubjectColor(companion.subject)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Sessions */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="mb-4">Continue Your Journey</h2>
              <p className="text-muted-foreground">
                Pick up where you left off with your recent learning sessions
              </p>
            </div>
            <Link href="/my-journey">
              <button className="btn-ghost">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="animate-slide-in-left">
              <CompanionsList
                title="Recent Sessions"
                companions={recentSessionsCompanions}
                classNames="w-full"
              />
            </div>
            <div className="animate-slide-in-right">
              <CTA />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;