import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
} from "@/lib/actions/companion.actions";
import CompanionsList from "@/components/CompanionsList";
import { 
  User, 
  BookOpen, 
  CheckCircle, 
  GraduationCap, 
  Calendar,
  TrendingUp,
  Star,
  Clock
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);

  // Calculate stats
  const totalMinutes = sessionHistory.reduce((acc, session: Companion) => acc + (session?.duration || 0), 0);
  const averageSessionLength = sessionHistory.length > 0 ? Math.round(totalMinutes / sessionHistory.length) : 0;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full px-4 py-2 bg-primary/10 text-primary text-sm font-medium mb-6">
            <User className="w-4 h-4 mr-2" />
            Learning Journey
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Welcome back,
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {user.firstName}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your progress and continue your learning journey
          </p>
        </div>

        {/* Profile Card */}
        <div className="card p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* User Info */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <Image
                  src={user.imageUrl}
                  alt={user.firstName!}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-2xl object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-muted-foreground mb-2">
                  {user.emailAddresses[0].emailAddress}
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  Member since {new Date(user.createdAt!).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/companions/new">
                <button className="btn-gradient">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Create Companion
                </button>
              </Link>
              <Link href="/companions">
                <button className="btn-secondary">
                  Browse Library
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">{sessionHistory.length}</div>
            <div className="text-sm text-muted-foreground">Lessons Completed</div>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6 text-accent" />
            </div>
            <div className="text-3xl font-bold mb-2">{companions.length}</div>
            <div className="text-sm text-muted-foreground">Companions Created</div>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">{totalMinutes}</div>
            <div className="text-sm text-muted-foreground">Minutes Learned</div>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <div className="text-3xl font-bold mb-2">{averageSessionLength}</div>
            <div className="text-sm text-muted-foreground">Avg Session (min)</div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="space-y-6">
          <Accordion type="multiple" className="space-y-4">
            <AccordionItem value="recent" className="card">
              <AccordionTrigger className="text-xl font-semibold px-6 py-4 hover:no-underline">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-primary" />
                  Recent Learning Sessions
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                {sessionHistory.length > 0 ? (
                  <CompanionsList
                    title=""
                    companions={sessionHistory}
                  />
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No recent sessions</h3>
                    <p className="text-muted-foreground mb-6">
                      Start your learning journey by creating a companion
                    </p>
                    <Link href="/companions/new">
                      <button className="btn-primary">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Create Your First Companion
                      </button>
                    </Link>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="companions" className="card">
              <AccordionTrigger className="text-xl font-semibold px-6 py-4 hover:no-underline">
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-3 text-primary" />
                  My Companions ({companions.length})
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                {companions.length > 0 ? (
                  <CompanionsList title="" companions={companions} />
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No companions yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Create your first AI learning companion to get started
                    </p>
                    <Link href="/companions/new">
                      <button className="btn-gradient">
                        <Star className="w-4 h-4 mr-2" />
                        Create Your First Companion
                      </button>
                    </Link>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Profile;