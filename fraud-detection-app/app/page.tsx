import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-3">
          <h1 className="text-5xl font-bold text-gray-900">
            FraudGuard
          </h1>
          <p className="text-xl text-gray-600">
            AI-powered fraud detection for your transactions
          </p>
        </div>

        {/* Key Benefits - Simple Icons */}
        <div className="grid md:grid-cols-3 gap-6 my-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl mb-3">🛡️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Real-time Protection</h3>
            <p className="text-sm text-gray-600">Instant fraud analysis on every transaction</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
            <p className="text-sm text-gray-600">Google Gemini analyzes spending patterns</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Track History</h3>
            <p className="text-sm text-gray-600">Monitor all your transactions in one place</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center">
          <Link 
            href="/login"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </Link>
          <Link 
            href="/dashboard"
            className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-indigo-200"
          >
            View Demo
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-gray-500 mt-12">
          No credit card required • Free tier available • Secure by default
        </p>
      </div>
    </div>
  )
}