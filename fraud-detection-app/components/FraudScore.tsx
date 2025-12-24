'use client'

interface FraudScoreProps {
  analysis: any
}

export default function FraudScore({ analysis }: FraudScoreProps) {
  if (!analysis) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 h-full flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-sm">Submit a transaction to see fraud analysis</p>
        </div>
      </div>
    )
  }

  const score = analysis.fraud_score || 0
  const isFraudulent = score >= 70
  const isWarning = score >= 40 && score < 70
  const isSafe = score < 40

  const getScoreColor = () => {
    if (isFraudulent) return 'text-red-600'
    if (isWarning) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getScoreBg = () => {
    if (isFraudulent) return 'bg-red-50 border-red-200'
    if (isWarning) return 'bg-yellow-50 border-yellow-200'
    return 'bg-green-50 border-green-200'
  }

  const getStatusEmoji = () => {
    if (isFraudulent) return '🚨'
    if (isWarning) return '⚠️'
    return '✅'
  }

  const getStatusText = () => {
    if (isFraudulent) return 'High Risk'
    if (isWarning) return 'Suspicious'
    return 'Looks Safe'
  }

  const getProgressBarColor = () => {
    if (isFraudulent) return 'bg-red-500'
    if (isWarning) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Fraud Analysis</h3>

      {/* Score Display Card */}
      <div className={`${getScoreBg()} border-2 rounded-xl p-6 text-center`}>
        <div className="text-5xl mb-2">{getStatusEmoji()}</div>
        <div className={`text-5xl font-bold ${getScoreColor()} mb-2`}>
          {score}%
        </div>
        <div className={`text-lg font-medium ${getScoreColor()}`}>
          {getStatusText()}
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Safe</span>
          <span>Risky</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${getProgressBarColor()}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Risk Level Indicators */}
      <div className="grid grid-cols-3 gap-2 text-xs text-center">
        <div className={`p-2 rounded ${isSafe ? 'bg-green-100 text-green-700 font-medium' : 'bg-gray-100 text-gray-500'}`}>
          0-39% Safe
        </div>
        <div className={`p-2 rounded ${isWarning ? 'bg-yellow-100 text-yellow-700 font-medium' : 'bg-gray-100 text-gray-500'}`}>
          40-69% Watch
        </div>
        <div className={`p-2 rounded ${isFraudulent ? 'bg-red-100 text-red-700 font-medium' : 'bg-gray-100 text-gray-500'}`}>
          70-100% Risk
        </div>
      </div>

      {/* AI Reasoning */}
      {analysis.ai_reasoning && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">AI Analysis:</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {analysis.ai_reasoning}
          </p>
        </div>
      )}

      {/* Transaction Details */}
      {analysis.transaction && (
        <div className="pt-4 border-t border-gray-200 space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Transaction Details:</h4>
          <div className="text-sm space-y-1">
            {analysis.transaction.amount && (
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">${analysis.transaction.amount}</span>
              </div>
            )}
            {analysis.transaction.merchant && (
              <div className="flex justify-between">
                <span className="text-gray-600">Merchant:</span>
                <span className="font-medium">{analysis.transaction.merchant}</span>
              </div>
            )}
            {analysis.transaction.location && (
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{analysis.transaction.location}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2">
        {isFraudulent && (
          <button className="w-full bg-red-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
            🚫 Report & Block Transaction
          </button>
        )}
        
        {isWarning && (
          <button className="w-full bg-yellow-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors">
            👁️ Mark for Review
          </button>
        )}

        {isSafe && (
          <button className="w-full bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
            ✓ Approve Transaction
          </button>
        )}
      </div>
    </div>
  )
}