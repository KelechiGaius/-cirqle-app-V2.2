
import { GoogleGenAI } from "@google/genai";

// Kept for legacy use if needed, but main logic moved to component for direct control over JSON parsing
export const generateIcebreaker = async (interests: string[]): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
       const fallbacks = [
         "If you could teleport anywhere right now, where would you go?",
         "What's the best coffee spot you've found in the city so far?",
         "What's a hobby you've always wanted to pick up but haven't yet?",
       ];
       return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Generate a single, fun, short conversation starter for 6 people interested in: ${interests.join(', ')}. Casual tone.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "What's everyone's favorite weekend activity?";
  } catch (error) {
    console.error("Error generating icebreaker:", error);
    return "What's the best thing that happened to you this week?";
  }
};
