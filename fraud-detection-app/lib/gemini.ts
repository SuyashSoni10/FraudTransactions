import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)

export async function detectFraud(transactionData: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })
  
  const prompt = `Analyze this transaction for fraud...`
  
  const result = await model.generateContent(prompt)
  return result.response.text()
}