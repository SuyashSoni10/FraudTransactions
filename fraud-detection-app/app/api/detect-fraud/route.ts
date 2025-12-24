import { NextResponse } from 'next/server'
import { detectFraud } from '@/lib/gemini'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  const data = await request.json()
  
  // Get fraud analysis from Gemini
  const analysis = await detectFraud(data)
  
  // Save to Supabase
  const { data: transaction, error } = await supabase
    .from('transactions')
    .insert({
      user_id: data.userId,
      amount: data.amount,
      merchant_name: data.merchant,
      fraud_score: analysis.score,
      ai_reasoning: analysis.reasoning
    })
    .select()
  
  return NextResponse.json({ transaction, analysis })
}