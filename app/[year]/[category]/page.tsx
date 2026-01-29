import React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { SurveyNav } from "@/components/survey-nav"
import { SurveyChart } from "@/components/survey-chart"
import {
  getCategoriesForYear,
  isValidSurveyYear,
  type SurveyData,
  type SurveySection,
  findSectionByQuestion,
  determineChartType,
  titleToKey,
  transformSurveyData,
  type SurveyYear,
  SURVEY_YEARS,
} from "@/lib/survey-config"
import aiChatbotsData2025 from "@/data/survey2025_ai_chatbots_stats.json"
import aiEngineeringData2025 from "@/data/survey2025_ai_engineering_stats.json"
import dataEngineeringData2025 from "@/data/survey2025_data_engineering_stats.json"
import mlMlopsData2025 from "@/data/survey2025_ml_mlops_stats.json"
import aiChatbotsData2026 from "@/data/survey2026_ai_chatbots_stats.json"
import aiEngineeringData2026 from "@/data/survey2026_ai_engineering_stats.json"
import dataEngineeringData2026 from "@/data/survey2026_data_engineering_stats.json"
import dtcInteractionData2026 from "@/data/survey2026_dtc_interaction_stats.json"
import mlMlopsData2026 from "@/data/survey2026_ml_mlops_stats.json"
import {
  Users,
  Cpu,
  Database,
  Sparkles,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  cpu: Cpu,
  database: Database,
  sparkles: Sparkles,
  "message-circle": MessageCircle,
}

const dataFileMap: Record<string, SurveyData> = {
  "survey2025_ai_chatbots_stats.json": transformSurveyData(aiChatbotsData2025 as any),
  "survey2025_ai_engineering_stats.json": transformSurveyData(aiEngineeringData2025 as any),
  "survey2025_data_engineering_stats.json": transformSurveyData(dataEngineeringData2025 as any),
  "survey2025_ml_mlops_stats.json": transformSurveyData(mlMlopsData2025 as any),
  "survey2026_ai_chatbots_stats.json": transformSurveyData(aiChatbotsData2026 as any),
  "survey2026_ai_engineering_stats.json": transformSurveyData(aiEngineeringData2026 as any),
  "survey2026_data_engineering_stats.json": transformSurveyData(dataEngineeringData2026 as any),
  "survey2026_dtc_interaction_stats.json": transformSurveyData(dtcInteractionData2026 as any),
  "survey2026_ml_mlops_stats.json": transformSurveyData(mlMlopsData2026 as any),
}

function getChartData(section: SurveySection) {
  return section.distribution
    .map((item) => ({
      name: item.value,
      value: item.percentage,
      percentage: item.percentage,
      count: item.count,
      text: item.text,
    }))
    .slice(0, 10)
}

export function generateStaticParams() {
  const params: { year: string; category: string }[] = []
  for (const year of SURVEY_YEARS) {
    const categories = getCategoriesForYear(year)
    for (const category of categories) {
      params.push({ year, category: category.id })
    }
  }
  return params
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; category: string }>
}) {
  return params.then(({ year, category: categoryId }) => {
    if (!isValidSurveyYear(year)) return { title: "Not Found" }
    const categories = getCategoriesForYear(year as SurveyYear)
    const category = categories.find((c) => c.id === categoryId)
    if (!category) return { title: "Not Found" }
    return {
      title: `${category.title} - Survey Results ${year.replace("-", "–")}`,
      description: category.description,
    }
  })
}

export default async function YearCategoryPage({
  params,
}: {
  params: Promise<{ year: string; category: string }>
}) {
  const { year, category: categoryId } = await params
  if (!isValidSurveyYear(year)) {
    notFound()
  }
  const surveyYear = year as SurveyYear
  const categories = getCategoriesForYear(surveyYear)
  const category = categories.find((c) => c.id === categoryId)

  if (!category) {
    notFound()
  }

  const surveyData = dataFileMap[category.dataFile]
  if (!surveyData) {
    notFound()
  }

  const Icon = iconMap[category.icon] || Users

  const currentIndex = categories.findIndex((c) => c.id === categoryId)
  const prevCategory = currentIndex > 0 ? categories[currentIndex - 1] : null
  const nextCategory =
    currentIndex < categories.length - 1 ? categories[currentIndex + 1] : null

  return (
    <main className="min-h-screen bg-background">
      <SurveyNav />

      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href={`/${year}`}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-3 h-3" />
              Back to Overview
            </Link>
            <span className="text-xs font-medium text-muted-foreground/80">
              {year.replace("-", "–")}
            </span>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-muted">
              <Icon className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-title font-medium text-foreground mb-2 text-balance">
                {category.title}
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          {(() => {
            const displayedSections = new Set<string>()

            const configuredCharts = category.questions
              .map((question) => {
                const section = findSectionByQuestion(surveyData.sections, question.key)
                if (!section) return null

                const data = getChartData(section)
                if (data.length === 0) return null

                displayedSections.add(section.title)

                return (
                  <SurveyChart
                    key={question.key}
                    title={question.title}
                    description={question.description}
                    data={data}
                    chartType={question.chartType}
                    totalResponses={section.responses}
                    showCounts={question.showCounts}
                  />
                )
              })
              .filter(Boolean)

            const remainingCharts = surveyData.sections
              .filter((section) => !displayedSections.has(section.title))
              .map((section) => {
                const data = getChartData(section)
                if (data.length === 0) return null

                const chartType = determineChartType(section)
                const sectionKey = titleToKey(section.title)

                return (
                  <SurveyChart
                    key={`section-${sectionKey}`}
                    title={section.title}
                    description={`${section.responses} responses${section.missing > 0 ? ` (${section.missing} missing)` : ""}`}
                    data={data}
                    chartType={chartType}
                    totalResponses={section.responses}
                  />
                )
              })
              .filter(Boolean)

            return [...configuredCharts, ...remainingCharts]
          })()}
        </div>

        <nav className="flex items-center justify-between mt-10 pt-6 border-t border-border">
          {prevCategory ? (
            <Link
              href={`/${year}/${prevCategory.id}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">{prevCategory.shortTitle}</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          ) : (
            <div />
          )}

          {nextCategory ? (
            <Link
              href={`/${year}/${nextCategory.id}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <span className="hidden sm:inline">{nextCategory.shortTitle}</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <Link
              href={`/${year}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <span>Back to Overview</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </nav>
      </div>

      <footer className="border-t border-border bg-card mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-xs text-muted-foreground text-center">
            {surveyData.sections.length} sections • {category.questions.length} configured questions
          </p>
        </div>
      </footer>
    </main>
  )
}
