'use client'

import { useState, useEffect } from 'react'

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      // Replace with actual Supabase call:
      //const { data } = await supabase.from('transactions').select('*').order('created_at', { ascending: false })
      
      // Mock data for demo
      const mockData = [
        {
          id: '1',
          amount: 45.99,
          merchant_name: 'Amazon',
          merchant_category: 'shopping',
          location: 'New York, NY',
          fraud_score: 15,
          created_at: new Date().toISOString(),
          status: 'approved'
        },
        {
          id: '2',
          amount: 1250.00,
          merchant_name: 'Unknown Vendor',
          merchant_category: 'other',
          location: 'Nigeria',
          fraud_score: 92,
          created_at: new Date(Date.now() - 3600000).toISOString(),
          status: 'declined'
        },
        {
          id: '3',
          amount: 78.50,
          merchant_name: 'Starbucks',
          merchant_category: 'dining',
          location: 'San Francisco, CA',
          fraud_score: 8,
          created_at: new Date(Date.now() - 7200000).toISOString(),
          status: 'approved'
        }
      ]
      
      setTransactions(mockData)
      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  const getScoreBadge = (score: number) => {
    if (score >= 70) {
      return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded">High Risk</span>
    }
    if (score >= 40) {
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded">Suspicious</span>
    }
    return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">Safe</span>
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: 'bg-green-100 text-green-700',
      declined: 'bg-red-100 text-red-700',
      pending: 'bg-gray-100 text-gray-700'
    }
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading transactions...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          View All
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-3">📭</div>
          <p>No transactions yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="text-2xl">
                  {transaction.fraud_score >= 70 ? '🚨' : transaction.fraud_score >= 40 ? '⚠️' : '💳'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-gray-900">{transaction.merchant_name}</span>
                    {getScoreBadge(transaction.fraud_score)}
                    {getStatusBadge(transaction.status)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.location} • {formatDate(transaction.created_at)}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  ${transaction.amount.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  Score: {transaction.fraud_score}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}