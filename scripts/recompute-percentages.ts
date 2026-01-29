/**
 * Script to recompute percentages in all survey data JSON files based on counts
 * Run with: npx tsx scripts/recompute-percentages.ts
 */

import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'
import type { SurveyData } from '../lib/survey-config'

const dataFiles = [
  'survey2026_ai_chatbots_stats.json',
  'survey2026_ai_engineering_stats.json',
  'survey2026_data_engineering_stats.json',
  'survey2026_dtc_interaction_stats.json',
  'survey2026_ml_mlops_stats.json',
  'survey2026_demographics_stats.json',
]

function recomputePercentages(data: SurveyData): SurveyData {
  // Process each section
  data.sections.forEach(section => {
    // Sum up all counts
    const totalCount = section.distribution.reduce((sum, item) => sum + item.count, 0)
    
    // Recompute percentages
    section.distribution.forEach(item => {
      item.percentage = totalCount > 0 ? Math.round((item.count / totalCount) * 1000) / 10 : 0
    })
  })
  
  return data
}

console.log('🔄 Recomputing percentages for all data files...\n')

let processedCount = 0
let errorCount = 0

dataFiles.forEach(filename => {
  try {
    const filePath = join(process.cwd(), 'data', filename)
    const fileContent = readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContent) as SurveyData
    
    const updatedData = recomputePercentages(data)
    
    // Write back to file with pretty formatting
    writeFileSync(filePath, JSON.stringify(updatedData, null, 2))
    
    console.log(`✅ Processed: ${filename}`)
    console.log(`   Sections: ${updatedData.sections.length}`)
    
    // Show sample verification
    if (updatedData.sections.length > 0) {
      const firstSection = updatedData.sections[0]
      const totalCount = firstSection.distribution.reduce((sum, item) => sum + item.count, 0)
      const totalPercentage = firstSection.distribution.reduce((sum, item) => sum + item.percentage, 0)
      console.log(`   Sample section: "${firstSection.title.substring(0, 50)}..."`)
      console.log(`   Total count: ${totalCount}, Total percentage: ${totalPercentage.toFixed(1)}%`)
    }
    console.log()
    
    processedCount++
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error)
    errorCount++
  }
})

console.log(`\n📊 Summary:`)
console.log(`   Processed: ${processedCount} files`)
if (errorCount > 0) {
  console.log(`   Errors: ${errorCount} files`)
}
console.log(`\n✨ Done!`)
