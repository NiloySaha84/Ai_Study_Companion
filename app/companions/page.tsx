import { getAllCompanions } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { BookOpen, Filter, Search } from "lucide-react";
import Link from "next/link";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : '';
  const topic = filters.topic ? filters.topic : '';

  const companions = await getAllCompanions({ subject, topic });

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full px-4 py-2 bg-primary/10 text-primary text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            AI Learning Library
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Discover Your Perfect
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Learning Companion
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our curated collection of AI tutors, each specialized in different subjects 
            and designed to make learning engaging and effective.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <SearchInput />
            </div>
          </div>
          <div className="sm:w-64">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <SubjectFilter />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">
            {companions.length} companion{companions.length !== 1 ? 's' : ''} found
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Sort by:</span>
            <select className="bg-background border border-border rounded-lg px-3 py-2 text-sm">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Duration</option>
              <option>Subject</option>
            </select>
          </div>
        </div>

        {/* Companions Grid */}
        {companions.length > 0 ? (
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
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">No companions found</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Try adjusting your search criteria or create a new companion to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.reload()} 
                className="btn-secondary"
              >
                Clear Filters
              </button>
              <Link href="/companions/new" className="btn-gradient">
                Create New Companion
              </Link>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {companions.length > 0 && companions.length >= 12 && (
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Load More Companions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanionsLibrary;