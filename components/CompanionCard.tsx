"use client";
import { removeBookmark } from "@/lib/actions/companion.actions";
import { addBookmark } from "@/lib/actions/companion.actions";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bookmark, Clock, Play, Star } from "lucide-react";
import { useState } from "react";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  bookmarked,
}: CompanionCardProps) => {
  const pathname = usePathname();
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (isBookmarked) {
        await removeBookmark(id, pathname);
        setIsBookmarked(false);
      } else {
        await addBookmark(id, pathname);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSubjectIcon = (subject: string) => {
    const icons: { [key: string]: string } = {
      mathematics: "🔢",
      science: "🔬",
      history: "📚",
      language: "🌍",
      coding: "💻",
      economics: "💰",
    };
    return icons[subject.toLowerCase()] || "📖";
  };

  return (
    <Link href={`/companions/${id}`} className="group">
      <article className="companion-card hover-lift hover-glow">
        {/* Header */}
        <div className="companion-card-header">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getSubjectIcon(subject)}</span>
            <span className="subject-badge">{subject}</span>
          </div>
          <button 
            className={`bookmark-btn ${isBookmarked ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={handleBookmark}
            disabled={isLoading}
          >
            <Bookmark 
              className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} 
            />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {topic}
            </p>
          </div>

          {/* Duration */}
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            <span>{duration} minutes</span>
          </div>

          {/* Rating (placeholder) */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-4 h-4 text-yellow-400 fill-current" 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">4.8</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button className="btn-primary w-full group-hover:shadow-lg transition-all duration-300">
            <Play className="w-4 h-4 mr-2" />
            Start Learning
          </button>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </article>
    </Link>
  );
};

export default CompanionCard;