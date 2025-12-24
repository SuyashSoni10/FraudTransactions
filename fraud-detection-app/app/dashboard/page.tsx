'use client'

import { useState } from 'react'
import TransactionForm from '@/components/transactionForm'
import FraudScore from '@/components/FraudScore'
import TransactionHistory from '@/components/transactionHistory'

export default function Dashboard() {
  const [lastAnalysis, setLastAnalysis] = useState<any>(null)
  const [refreshHistory, setRefreshHistory] = useState(0)

  const handleAnalysisComplete = (analysis: any) => {
    setLastAnalysis(analysis)
    setRefreshHistory(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">FraudGuard</h1>
          <button className="text-sm text-gray-600 hover:text-gray-900">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TransactionForm onAnalysisComplete={handleAnalysisComplete} />
          </div>
          <div className="lg:col-span-1">
            <FraudScore analysis={lastAnalysis} />
          </div>
        </div>
        <div>
          <TransactionHistory key={refreshHistory} />
        </div>
      </main>
    </div>
  )
}