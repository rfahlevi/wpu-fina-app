'use server'

import { environment } from '@/config/environment';
import { GoogleGenAI } from '@google/genai';


const ai = new GoogleGenAI({
    apiKey: environment.googleGenAiKey
})
export async function handleChat(message: string) {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: message,
        config: {}
    })

    return response.text
}