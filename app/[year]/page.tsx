import React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { SurveyNav } from "@/components/survey-nav"
import { getCategoriesForYear, isValidSurveyYear, type SurveyYear } from "@/lib/survey-config"
import {
  Users,
  Cpu,
  Database,
  Sparkles,
  MessageCircle,
  ArrowRight,
  UserCircle,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  cpu: Cpu,
  database: Database,
  sparkles: Sparkles,
  "message-circle": MessageCircle,
}

const totalResponsesByYear: Record<SurveyYear, number> = {
  "2024-2025": 0,
  "2025-2026": 79,
}

const surveyDateByYear: Record<SurveyYear, string> = {
  "2024-2025": "Survey conducted December 2024 - January 2025",
  "2025-2026": "Survey conducted December 2025 - January 2026",
}

export function generateStaticParams() {
  return [{ year: "2024-2025" }, { year: "2025-2026" }]
}

export default async function YearOverviewPage({
  params,
}: {
  params: Promise<{ year: string }>
}) {
  const { year } = await params
  if (!isValidSurveyYear(year)) {
    notFound()
  }
  const surveyYear = year as SurveyYear
  const categories = getCategoriesForYear(surveyYear)
  const totalResponses = totalResponsesByYear[surveyYear]

  return (
    <main className="min-h-screen bg-background">
      <SurveyNav />

      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <h1 className="text-2xl md:text-3xl font-title font-medium text-foreground mb-3 text-balance text-center">
            AI, Data Engineering & MLOps Survey {year.replace("-", "–")}
          </h1>
          <div className="max-w-3xl mx-auto space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              The AI space moves fast. There&apos;s a big gap between what&apos;s hyped and what works in production.
            </p>
            <p>
              We asked professionals how they use AI, data engineering, MLOps, and developer-focused AI tools. These results show what people are using, what&apos;s still experimental, and where teams plan to invest.
            </p>
            <p>
              Use these insights to make better decisions about tools and learning. We&apos;ll also use them to design courses and events that match what people actually need.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href={`/${year}/demographics`}
              className="inline-flex items-center gap-2 text-sm text-link hover:underline"
            >
              View Respondent Demographics
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            {surveyDateByYear[surveyYear]}
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <section className="mb-10">
          <h2 className="text-lg font-title font-medium text-foreground mb-4">
            Explore by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href={`/${year}/demographics`}
              className="group bg-card rounded-xl border border-border p-5 hover:border-primary/50 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-muted">
                  <UserCircle className="w-5 h-5 text-foreground" />
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-title font-medium text-foreground mb-1 text-sm">
                Respondent Demographics
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Geographic distribution, job roles, organization size, and industry sectors of survey respondents.
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                6 questions
              </p>
            </Link>

            {categories.map((category) => {
              const Icon = iconMap[category.icon] || Users
              return (
                <Link
                  key={category.id}
                  href={`/${year}/${category.id}`}
                  className="group bg-card rounded-xl border border-border p-5 hover:border-primary/50 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-title font-medium text-foreground mb-1 text-sm">
                    {category.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    {category.questions.length} questions
                  </p>
                </Link>
              )
            })}
          </div>
        </section>
      </div>

      <footer className="border-t border-border bg-card mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-xs text-muted-foreground text-center">
            Data collected from {totalResponses} survey responses. Showing all available sections from survey data.
          </p>
        </div>
      </footer>
    </main>
  )
}
