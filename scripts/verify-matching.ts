/**
 * Verification script to check if question keys match section titles
 * Run with: npx tsx scripts/verify-matching.ts
 */

import { categories, demographicsQuestions, findSectionByQuestion, transformSurveyData, type SurveyData } from '../lib/survey-config'
import aiChatbotsData from '../data/survey2026_ai_chatbots_stats.json'
import aiEngineeringData from '../data/survey2026_ai_engineering_stats.json'
import dataEngineeringData from '../data/survey2026_data_engineering_stats.json'
import dtcInteractionData from '../data/survey2026_dtc_interaction_stats.json'
import mlMlopsData from '../data/survey2026_ml_mlops_stats.json'
import demographicsData from '../data/survey2026_demographics_stats.json'

const dataFileMap: Record<string, SurveyData> = {
  "survey2026_ai_chatbots_stats.json": transformSurveyData(aiChatbotsData as any),
  "survey2026_ai_engineering_stats.json": transformSurveyData(aiEngineeringData as any),
  "survey2026_data_engineering_stats.json": transformSurveyData(dataEngineeringData as any),
  "survey2026_dtc_interaction_stats.json": transformSurveyData(dtcInteractionData as any),
  "survey2026_ml_mlops_stats.json": transformSurveyData(mlMlopsData as any),
  "survey2026_demographics_stats.json": transformSurveyData(demographicsData as any),
}

console.log('🔍 Verifying question key matching...\n')

// Check category questions
let totalQuestions = 0
let matchedQuestions = 0
let unmatchedQuestions: Array<{ category: string; questionKey: string; questionTitle: string }> = []

categories.forEach(category => {
  const surveyData = dataFileMap[category.dataFile]
  if (!surveyData) {
    console.error(`❌ No data file found for category: ${category.id}`)
    return
  }

  console.log(`\n📁 Category: ${category.title}`)
  console.log(`   Data file: ${category.dataFile}`)
  console.log(`   Total sections: ${surveyData.sections.length}`)
  console.log(`   Questions in config: ${category.questions.length}`)

  category.questions.forEach(question => {
    totalQuestions++
    const section = findSectionByQuestion(surveyData.sections, question.key)
    if (section) {
      matchedQuestions++
      console.log(`   ✅ Matched: ${question.title}`)
    } else {
      unmatchedQuestions.push({
        category: category.title,
        questionKey: question.key,
        questionTitle: question.title
      })
      console.log(`   ❌ Unmatched: ${question.title}`)
      console.log(`      Key: ${question.key}`)
      console.log(`      Available sections:`)
      surveyData.sections.forEach(s => {
        console.log(`        - ${s.title}`)
      })
    }
  })
})

// Check demographics questions
console.log(`\n📊 Demographics Questions`)
const demographicsSurveyData = dataFileMap["survey2026_demographics_stats.json"]
demographicsQuestions.forEach(question => {
  totalQuestions++
  const section = findSectionByQuestion(demographicsSurveyData.sections, question.key)
  if (section) {
    matchedQuestions++
    console.log(`   ✅ Matched: ${question.title}`)
  } else {
    unmatchedQuestions.push({
      category: "Demographics",
      questionKey: question.key,
      questionTitle: question.title
    })
    console.log(`   ❌ Unmatched: ${question.title}`)
    console.log(`      Key: ${question.key}`)
  }
})

// Summary
console.log(`\n\n📈 Summary:`)
console.log(`   Total questions: ${totalQuestions}`)
console.log(`   Matched: ${matchedQuestions} (${Math.round(matchedQuestions / totalQuestions * 100)}%)`)
console.log(`   Unmatched: ${unmatchedQuestions.length} (${Math.round(unmatchedQuestions.length / totalQuestions * 100)}%)`)

if (unmatchedQuestions.length > 0) {
  console.log(`\n⚠️  Unmatched Questions:`)
  unmatchedQuestions.forEach(q => {
    console.log(`   - [${q.category}] ${q.questionTitle}`)
    console.log(`     Key: ${q.questionKey}`)
  })
}
