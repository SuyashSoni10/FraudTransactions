'use client'

import { useState } from 'react'

interface TransactionFormProps {
  onAnalysisComplete: (analysis: any) => void
}

export default function TransactionForm({ onAnalysisComplete }: TransactionFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    amount: '',
    merchant: '',
    category: '',
    location: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
  
    try {
      console.log('Submitting form data:', formData)
      
      const response = await fetch('/api/detect-fraud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
  
      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)
  
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response:', errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const result = await response.json()
      console.log('Result:', result)
      
      onAnalysisComplete(result)
  
      // Reset form
      setFormData({ amount: '', merchant: '', category: '', location: '' })
    } catch (error) {
      console.error('Error details:', error)
      alert(`Failed to analyze transaction: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Check New Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Amount Field */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Merchant Name Field */}
        <div>
          <label htmlFor="merchant" className="block text-sm font-medium text-gray-700 mb-2">
            Merchant Name
          </label>
          <input
            type="text"
            id="merchant"
            name="merchant"
            value={formData.merchant}
            onChange={handleChange}
            required
            placeholder="e.g., Amazon, Starbucks, Walmart"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Category Field */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white outline-none"
          >
            <option value="">Select category</option>
            <option value="groceries">Groceries</option>
            <option value="dining">Dining</option>
            <option value="shopping">Shopping</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
            <option value="bills">Bills & Utilities</option>
            <option value="healthcare">Healthcare</option>
            <option value="gas">Gas & Fuel</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Location Field */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="e.g., New York, NY or London, UK"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Analyzing...
            </span>
          ) : (
            'Analyze Transaction'
          )}
        </button>
      </form>

      {/* Helpful Tip */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Enter transaction details as accurately as possible for better fraud detection
        </p>
      </div>
    </div>
  )
}