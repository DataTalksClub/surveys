import React from "react"
import Link from "next/link"
import { SURVEY_YEARS } from "@/lib/survey-config"
import { ArrowRight } from "lucide-react"

export default function YearSelectionPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-2xl md:text-3xl font-title font-medium text-foreground mb-3 text-balance text-center">
            AI, Data Engineering & MLOps Survey Results
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-center">
            Choose a survey year to explore results by category and demographics.
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SURVEY_YEARS.map((year) => (
            <Link
              key={year}
              href={`/${year}`}
              className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-sm transition-all"
            >
              <span className="text-lg font-title font-medium text-foreground">
                {year.replace("-", "–")} Survey
              </span>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      <footer className="border-t border-border bg-card mt-8">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <p className="text-xs text-muted-foreground text-center">
            Survey results from professionals working with AI, data engineering, MLOps, and developer-focused AI tools.
          </p>
        </div>
      </footer>
    </main>
  )
}
