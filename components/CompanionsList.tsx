import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import { Clock, Play, BookOpen } from "lucide-react";

interface CompanionsListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
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
    <article className={cn('card p-6 lg:p-8', classNames)}>
      <div className="flex items-center mb-6">
        <BookOpen className="w-6 h-6 text-primary mr-3" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      {companions && companions.length > 0 ? (
        <div className="space-y-4">
          {companions.map((companion, index) => (
            <Link 
              key={companion.id} 
              href={`/companions/${companion.id}`}
              className="block group"
            >
              <div 
                className="flex items-center p-4 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 group-hover:bg-muted/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Subject Icon */}
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mr-4 text-2xl group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: getSubjectColor(companion.subject) + '20' }}
                >
                  {getSubjectIcon(companion.subject)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors truncate">
                    {companion.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                    {companion.topic}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="subject-badge">{companion.subject}</span>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{companion.duration} min</span>
                    </div>
                  </div>
                </div>

                {/* Play Button */}
                <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No recent sessions</h3>
          <p className="text-muted-foreground mb-6">
            Start your learning journey by creating a new companion
          </p>
          <Link href="/companions/new">
            <button className="btn-primary">
              <Play className="w-4 h-4 mr-2" />
              Create Companion
            </button>
          </Link>
        </div>
      )}
    </article>
  );
};

export default CompanionsList;