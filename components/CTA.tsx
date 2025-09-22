import Link from "next/link";
import { Plus, Sparkles, ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <div className="card p-8 lg:p-12 text-center group hover-lift">
      <div className="max-w-md mx-auto">
        {/* Icon */}
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        
        {/* Badge */}
        <div className="inline-flex items-center rounded-full px-4 py-2 bg-primary/10 text-primary text-sm font-medium mb-6">
          <Plus className="w-4 h-4 mr-2" />
          Create Your Perfect Tutor
        </div>
        
        {/* Content */}
        <h2 className="text-2xl lg:text-3xl font-bold mb-4">
          Build Your Personal
          <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Learning Companion
          </span>
        </h2>
        
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Customize your AI tutor with a unique name, subject expertise, voice, and personality. 
          Create the perfect learning experience tailored just for you.
        </p>
        
        {/* Features */}
        <div className="space-y-3 mb-8 text-left">
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full mr-3" />
            Choose from multiple subjects
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full mr-3" />
            Select your preferred voice
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full mr-3" />
            Customize personality traits
          </div>
        </div>
        
        {/* CTA Button */}
        <Link href="/companions/new">
          <button className="btn-gradient w-full group/btn">
            <Plus className="w-5 h-5 mr-2" />
            Create New Companion
            <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </Link>
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
      </div>
    </div>
  );
};

export default CTA;