import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)

export async function detectFraud(transactionData: any) {
  // Updated model name - use gemini-1.5-flash or gemini-1.5-pro
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  
  
  const prompt = `You are a fraud detection AI. Analyze this transaction and respond ONLY with valid JSON in this exact format:
{
  "score": <number between 0-100>,
  "reasoning": "<brief explanation>"
}

Transaction Details:
- Amount: $${transactionData.amount}
- Merchant: ${transactionData.merchant}
- Category: ${transactionData.category}
- Location: ${transactionData.location}

Analyze for fraud indicators like:
- Unusual amount for category
- Suspicious merchant name
- High-risk location
- Odd transaction patterns

Respond ONLY with the JSON object, no other text.`
  
  try {
    const result = await model.generateContent(prompt)
    const responseText = result.response.text()
    
    // Remove any markdown code blocks if present
    const cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const parsedResponse = JSON.parse(cleanedText)
    
    return {
      score: parsedResponse.score || 50,
      reasoning: parsedResponse.reasoning || 'Unable to analyze transaction'
    }
  } catch (error) {
    console.error('Gemini error:', error)
    // Fallback response
    return {
      score: 50,
      reasoning: 'Unable to analyze transaction properly. Please try again.'
    }
  }
}