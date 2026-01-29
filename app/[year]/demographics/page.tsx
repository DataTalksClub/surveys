import React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { SurveyNav } from "@/components/survey-nav"
import { SurveyChart } from "@/components/survey-chart"
import {
  getDemographicsQuestionsForYear,
  isValidSurveyYear,
  type SurveySection,
  findSectionByQuestion,
  determineChartType,
  titleToKey,
  transformSurveyData,
  type SurveyYear,
} from "@/lib/survey-config"
import demographicsData2025 from "@/data/survey2025_demographics_stats.json"
import demographicsData2026 from "@/data/survey2026_demographics_stats.json"
import { ChevronLeft } from "lucide-react"

const demographicsDataByYear = {
  "2024-2025": transformSurveyData(demographicsData2025 as any),
  "2025-2026": transformSurveyData(demographicsData2026 as any),
}

function getChartData(section: SurveySection) {
  return section.distribution.map((item) => ({
    name: item.value,
    value: item.percentage,
    percentage: item.percentage,
    count: item.count,
  }))
}

export function generateStaticParams() {
  return [{ year: "2024-2025" }, { year: "2025-2026" }]
}

export default async function YearDemographicsPage({
  params,
}: {
  params: Promise<{ year: string }>
}) {
  const { year } = await params
  if (!isValidSurveyYear(year)) {
    notFound()
  }
  const surveyYear = year as SurveyYear
  const surveyData = demographicsDataByYear[surveyYear]
  const totalResponses = surveyData.total_responses
  const demographicsQuestions = getDemographicsQuestionsForYear(surveyYear)

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
          <h1 className="text-xl md:text-2xl font-title font-medium text-foreground mb-2 text-balance">
            Respondent Demographics
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Demographic information from {totalResponses} survey respondents.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          {(() => {
            const displayedSections = new Set<string>()

            const configuredCharts = demographicsQuestions
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
      </div>

      <footer className="border-t border-border bg-card mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-xs text-muted-foreground text-center">
            Data collected from {totalResponses} survey responses. Showing all available demographic sections.
          </p>
        </div>
      </footer>
    </main>
  )
}
