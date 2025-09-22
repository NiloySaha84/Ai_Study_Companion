import { getCompanion } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import CompanionComponent from "@/components/CompanionComponent";
import { Clock, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();

  const { name, subject, topic, duration } = companion;

  if (!user) redirect('/sign-in');
  if (!name) redirect('/companions');

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
    <div className="min-h-screen bg-muted/30">
      <div className="container py-8">
        {/* Back Button */}
        <Link 
          href="/companions" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Library
        </Link>

        {/* Companion Header */}
        <div className="card p-6 lg:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              {/* Subject Icon */}
              <div 
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: getSubjectColor(subject) + '20' }}
              >
                {getSubjectIcon(subject)}
              </div>

              {/* Companion Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl lg:text-3xl font-bold">{name}</h1>
                  <span className="subject-badge">{subject}</span>
                </div>
                <p className="text-lg text-muted-foreground mb-3">{topic}</p>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{duration} minutes</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="btn-secondary">
                <BookOpen className="w-4 h-4 mr-2" />
                Study Guide
              </button>
              <button className="btn-gradient">
                Start Session
              </button>
            </div>
          </div>
        </div>

        {/* Companion Interface */}
        <CompanionComponent
          {...companion}
          companionId={id}
          userName={user.firstName!}
          userImage={user.imageUrl!}
        />
      </div>
    </div>
  );
};

export default CompanionSession;