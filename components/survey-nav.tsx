"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { getCategoriesForYear, SURVEY_YEARS, type SurveyYear } from "@/lib/survey-config"
import {
  Users,
  Cpu,
  Database,
  Sparkles,
  MessageCircle,
  LayoutDashboard,
  UserCircle,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  cpu: Cpu,
  database: Database,
  sparkles: Sparkles,
  "message-circle": MessageCircle,
}

function getYearFromPathname(pathname: string): SurveyYear | null {
  if (pathname.startsWith("/2024-2025")) return "2024-2025"
  if (pathname.startsWith("/2025-2026")) return "2025-2026"
  return null
}

export function SurveyNav() {
  const pathname = usePathname()
  const year = getYearFromPathname(pathname)

  // On year picker (/) or invalid path, show minimal nav: link back to year selection
  if (pathname === "/" || !year) {
    return (
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Link
            href="/"
            className="text-sm font-medium text-link hover:underline transition-colors"
          >
            Survey Results
          </Link>
        </div>
      </nav>
    )
  }

  const categories = getCategoriesForYear(year)
  const overviewHref = `/${year}`
  const demographicsHref = `/${year}/demographics`

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-1 pt-3 pb-2 border-b border-border/60">
          <span className="text-xs font-medium text-muted-foreground mr-2 shrink-0">
            Survey:
          </span>
          {SURVEY_YEARS.map((y) => (
            <Link
              key={y}
              href={`/${y}`}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                year === y
                  ? "bg-primary text-primary-foreground"
                  : "text-link hover:underline hover:bg-muted"
              )}
            >
              {y.replace("-", "–")}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          <Link
            href={overviewHref}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              pathname === overviewHref
                ? "bg-primary text-primary-foreground"
                : "text-link hover:underline hover:bg-muted"
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </Link>

          <Link
            href={demographicsHref}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              pathname === demographicsHref
                ? "bg-primary text-primary-foreground"
                : "text-link hover:underline hover:bg-muted"
            )}
          >
            <UserCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Demographics</span>
          </Link>

          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Users
            const categoryHref = `/${year}/${category.id}`
            const isActive = pathname === categoryHref

            return (
              <Link
                key={category.id}
                href={categoryHref}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-link hover:underline hover:bg-muted"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.shortTitle}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
