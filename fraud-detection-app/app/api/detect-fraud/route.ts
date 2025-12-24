import { NextResponse } from 'next/server'
import { detectFraud } from '@/lib/gemini'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    console.log('API route called')
    
    const data = await request.json()
    console.log('Request data:', data)
    
    // Get fraud analysis from Gemini
    const analysis = await detectFraud(data)
    console.log('Analysis result:', analysis)
    
    // Save to Supabase
    const { data: transaction, error } = await supabase
      .from('transactions')
      .insert({
        user_id: data.userId || 'test-user-id', // Add fallback
        amount: data.amount,
        merchant_name: data.merchant,
        fraud_score: analysis.score,
        ai_reasoning: analysis.reasoning
      })
      .select()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    console.log('Transaction saved:', transaction)
    
    return NextResponse.json({ 
      transaction, 
      fraud_score: analysis.score,
      ai_reasoning: analysis.reasoning 
    })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      error: 'Failed to process transaction',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}


// import { NextResponse } from 'next/server'
// import { detectFraud } from '@/lib/gemini'
// import { supabase } from '@/lib/supabase'

// export async function POST(request: Request) {
//   try {
//     console.log('API route called')
    
//     const data = await request.json()
//     console.log('Request data:', data)
    
//     // Get fraud analysis from Gemini
//     const analysis = await detectFraud(data)
//     console.log('Analysis result:', analysis)
    
//     // Save to Supabase - WITHOUT user_id for now
//     const { data: transaction, error } = await supabase
//       .from('transactions')
//       .insert({
//         // user_id: null, // Skip this for now until auth is implemented
//         amount: data.amount,
//         merchant_name: data.merchant,
//         merchant_category: data.category,
//         location: data.location,
//         fraud_score: analysis.score,
//         ai_reasoning: analysis.reasoning,
//         status: analysis.score >= 70 ? 'declined' : analysis.score >= 40 ? 'pending' : 'approved'
//       })
//       .select()
    
//     if (error) {
//       console.error('Supabase error:', error)
//       return NextResponse.json({ error: error.message }, { status: 500 })
//     }
    
//     console.log('Transaction saved:', transaction)
    
//     return NextResponse.json({ 
//       transaction, 
//       fraud_score: analysis.score,
//       ai_reasoning: analysis.reasoning 
//     })
    
//   } catch (error) {
//     console.error('API Error:', error)
//     return NextResponse.json({ 
//       error: 'Failed to process transaction',
//       details: error instanceof Error ? error.message : 'Unknown error'
//     }, { status: 500 })
//   }
// }