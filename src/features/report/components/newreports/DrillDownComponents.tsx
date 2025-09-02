import React, { useState } from "react"
import {
  ChevronRightIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  UsersIcon,
  ExclamationCircleIcon,
  ClockIcon,
  HomeIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline"
import { Theme } from "../../../../utils/colors"
import Button from "../../../../components/Button"
import Badge from "../../../../components/Badge"

type SectionNode = {
  sectionName?: string
  timeSpent?: string
  totalQuestion?: number
  correctQuestions?: number
  incorrectQuestions?: number
  unattemptedQuestions?: number
  sectionTotalScore?: number
  percentage?: number
  sectionScore?: number
  correctQuestionsPercentage?: number
  incorrectQuestionsPercentage?: number
  unattemptedQuestionsPercentage?: number
  children?: SectionNode[]
}

type DrillDownComponentsProps = {
  section?: SectionNode[]
}

function DrillDownComponents({ section }: DrillDownComponentsProps) {
  const [currentPath, setCurrentPath] = useState<SectionNode[]>([])

  if (!section) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <div className="text-center">
          <QuestionMarkCircleIcon className="h-12 w-12 mx-auto mb-2" />
          <p>No data available</p>
        </div>
      </div>
    )
  }

  const goHome = () => {
    setCurrentPath([])
  }

  const navigateToBreadcrumb = (index: number) => {
    setCurrentPath(currentPath.slice(0, index))
  }

  const getCurrentSection = (): SectionNode[] => {
    if (currentPath.length === 0) return section

    let current = section
    for (const pathItem of currentPath) {
      const found = current.find((item) => item.sectionName === pathItem.sectionName)
      if (found?.children) {
        current = found.children
      }
    }
    return current
  }

  const navigateToSection = (section: SectionNode) => {
    if (section.children && section.children.length > 0) {
      setCurrentPath([...currentPath, section])
    }
  }

  const getPerformanceTheme = (percentage: number) => {
    if (percentage >= 80) return Theme.GreenHaze
    if (percentage >= 60) return Theme.Sunglow
    return Theme.Valencia
  }

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return "text-[var(--sb-green-haze-bg-active)]"
    if (percentage >= 60) return "text-[var(--sb-sunglow-bg-active)]"
    if (percentage >= 40) return "text-[var(--sb-pumpkin-bg-active)]"
    return "text-[var(--sb-valencia-bg-active)]"
  }

  const currentSections = getCurrentSection()
  const hasChildren = (section: SectionNode) => section.children && section.children.length > 0

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-[var(--text-tertiary)]">
        <Button style="secondary" onClick={goHome} className="h-8 px-2">
          <HomeIcon className="h-4 w-4" />
        </Button>

        {currentPath.map((pathItem, index) => (
          <React.Fragment key={pathItem.sectionName}>
            <ChevronRightIcon className="h-4 w-4" />
            <Button
              style="secondary"
              onClick={() => navigateToBreadcrumb(index + 1)}
              className="h-8 px-2 font-medium"
            >
              {pathItem.sectionName}
            </Button>
          </React.Fragment>
        ))}
      </div>

      {/* Section Heading */}
      <div className="flex items-center space-x-3 ml-2">
        <BookOpenIcon className="h-8 w-8 text-[var(--text-tertiary)]" />
        <h4 className="text-[var(--text-secondary)]">
          {currentPath.length === 0 ? "Exam Results Overview" : currentPath[currentPath.length - 1].sectionName}
        </h4>
      </div>

      {/* Sections Grid */}
      <div className="grid gap-4">
        {currentSections.map((section) => (
          <div
            key={section.sectionName}
            className="rounded-lg border border-[var(--border-primary)] bg-[var(--surface-bg-primary)] shadow-sm p-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {hasChildren(section) ? (
                  <button
                    onClick={() => navigateToSection(section)}
                    className="text-[var(--sb-ocean-bg-active)] font-semibold underline flex items-center hover:text-[var(--sb-ocean-bg-hover)]"
                  >
                    {section.sectionName}
                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                  </button>
                ) : (
                  <h6>{section.sectionName}</h6>
                )}
              </div>
              <Badge theme={getPerformanceTheme(section?.percentage || 80)} style="filled">
                {section?.percentage?.toFixed(1)}%
              </Badge>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Questions */}
              <div>
                <div className="flex items-center space-x-2 text-[var(--text-tertiary)]">
                  <UsersIcon className="h-4 w-4" />
                  <p>Questions</p>
                </div>
                <h4>{section.totalQuestion}</h4>
              </div>

              {/* Correct */}
              <div>
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4 text-[var(--sb-green-haze-bg-active)]" />
                  <p>Correct</p>
                </div>
                <h4 className="text-[var(--sb-green-haze-bg-active)]">{section.correctQuestions}</h4>
                <p className="text-[var(--text-tertiary)]">{section?.correctQuestionsPercentage?.toFixed(1)}%</p>
              </div>

              {/* Incorrect */}
              <div>
                <div className="flex items-center space-x-2">
                  <XCircleIcon className="h-4 w-4 text-[var(--sb-valencia-bg-active)]" />
                  <p>Incorrect</p>
                </div>
                <h4 className="text-[var(--sb-valencia-bg-active)]">{section.incorrectQuestions}</h4>
                <p className="text-[var(--text-tertiary)]">{section?.incorrectQuestionsPercentage?.toFixed(1)}%</p>
              </div>

              {/* Unattempted */}
              <div>
                <div className="flex items-center space-x-2">
                  <ExclamationCircleIcon className="h-4 w-4 text-[var(--sb-sunglow-bg-active)]" />
                  <p>Unattempted</p>
                </div>
                <h4 className="text-[var(--sb-sunglow-bg-active)]">{section.unattemptedQuestions}</h4>
                <p className="text-[var(--text-tertiary)]">{section?.unattemptedQuestionsPercentage?.toFixed(1)}%</p>
              </div>
            </div>

            {/* Extra Metrics */}
            <div className="mt-4 pt-3 border-t border-[var(--border-primary)] flex items-center justify-between text-[var(--text-tertiary)]">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4" />
                  <p>Time: {section.timeSpent}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  Score:{" "}
                  <p className={getPerformanceColor(section?.percentage || 45)}>
                    {section.sectionScore?.toFixed(1)}/{section.sectionTotalScore}
                  </p>
                </div>
              </div>

              {hasChildren(section) && (
                <Button style="secondary" onClick={() => navigateToSection(section)} className="h-8">
                  View Details
                  <ChevronRightIcon className="h-3 w-3 ml-1" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {currentSections.length === 0 && (
        <div className="rounded-lg border border-[var(--border-primary)] bg-[var(--surface-bg-primary)] shadow-sm text-center py-12">
          <BookOpenIcon className="h-12 w-12 text-[var(--text-tertiary)] mx-auto mb-4" />
          <h6 className="mb-2">No sections available</h6>
          <p className="text-[var(--text-tertiary)]">There are no subsections to display at this level.</p>
        </div>
      )}
    </div>
  )
}

export default DrillDownComponents
