
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === 'undefined') {
    throw new Error("API_KEY_MISSING");
  }
  return new GoogleGenAI({ apiKey });
};

export async function fetchLiveExperiences(vibe: string): Promise<any[]> {
  try {
    const ai = getAIClient();
    const today = new Date().toISOString().split('T')[0];
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Current Date: ${today} (April 2026).
                 Find 3 ACTUAL, SPECIFIC events or pop-up activities in Hong Kong happening TODAY or this weekend.
                 Vibe requested: "${vibe}".
                 
                 Requirements:
                 1. The event must be REAL and currently taking place or scheduled.
                 2. Provide the ACTUAL venue name and physical address.
                 3. Use Google Search to verify recent articles from Timeout Hong Kong, HK Magazine, or Discover Hong Kong.
                 4. Include the specific date or date range.
                 
                 Output exactly 3 experiences.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Name of the actual event (e.g. 'Art Central' or 'Lamma Fun Day')" },
              location: { type: Type.STRING },
              district: { type: Type.STRING },
              description: { type: Type.STRING },
              address: { type: Type.STRING },
              venue: { type: Type.STRING },
              date: { type: Type.STRING },
              duration: { type: Type.STRING },
              cost: { type: Type.STRING },
              imageKeyword: { type: Type.STRING, description: "Specific keyword for Unsplash, e.g. 'Sham Shui Po market night'" },
              sourceUrl: { type: Type.STRING },
              difficulty: { type: Type.STRING, enum: ['Easy', 'Moderate', 'Challenging'] }
            },
            required: ['title', 'location', 'district', 'description', 'address', 'sourceUrl', 'date', 'venue']
          }
        }
      },
    });

    return JSON.parse(response.text) as any[];
  } catch (error: any) {
    console.error("Live Sync Error:", error);
    throw error;
  }
}

export async function generateItinerary(
  prompt: string,
  userContext: { persona: string; interests: string[]; budget: string }
) {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        User Query: ${prompt}
        User Context: ${userContext.persona} interested in ${userContext.interests.join(', ')} with a ${userContext.budget} budget.
        
        Generate a quirky, REAL-WORLD Hong Kong itinerary. 
        Use Google Search to verify that the suggested places are OPEN and EXIST in Hong Kong.
        Use local slang (like "lah", "add oil", "ding ding") but stay readable.
      `,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  location: { type: Type.STRING }
                },
                required: ['time', 'title', 'description', 'location']
              }
            },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['summary', 'items', 'tips']
        }
      }
    });

    return JSON.parse(response.text) as any;
  } catch (error: any) {
    console.error("Itinerary Generation Error:", error);
    throw error;
  }
}
