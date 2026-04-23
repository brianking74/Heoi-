
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === 'undefined') {
    throw new Error("API_KEY_MISSING");
  }
  return new GoogleGenAI({ apiKey });
};

const DISTRICT_IMAGE_FALLBACKS: Record<string, string> = {
  'Central': 'photo-1506318137071-a8e063b4bcc0',
  'Sham Shui Po': 'photo-1540910419316-ce72ca97461d',
  'Tsim Sha Tsui': 'photo-1507724249767-c29013ce9119',
  'Mong Kok': 'photo-1560969184-10fe8719e047',
  'Sheung Wan': 'photo-1542314831-068cd1dbfeeb',
  'Causeway Bay': 'photo-1512453979798-5ea266f8880c',
  'Wanchai': 'photo-1516939884455-1445c8652f83',
  'Kowloon': 'photo-1560969184-10fe8719e047',
};

export async function fetchLiveExperiences(vibe: string): Promise<any[]> {
  try {
    const ai = getAIClient();
    const today = new Date().toISOString().split('T')[0];
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Current Date: ${today}.
                 Find 3 ACTUAL, SPECIFIC events or pop-up activities in Hong Kong happening TODAY or this weekend.
                 Vibe: "${vibe}".
                 
                 Requirements:
                 1. The event must be REAL and currently taking place.
                 2. Find the ACTUAL venue name and physical address.
                 3. Use Google Search to verify recent articles.
                 4. IMPORTANT: Identify an ACTUAL image URL from the event's official page or a news report if possible. 
                 5. If you cannot find a direct image URL, provide a highly specific Unsplash-compatible keyword like 'Sham Shui Po street market' or 'Central Hong Kong skyscrapers'.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              location: { type: Type.STRING },
              district: { type: Type.STRING },
              description: { type: Type.STRING },
              address: { type: Type.STRING },
              venue: { type: Type.STRING },
              date: { type: Type.STRING },
              duration: { type: Type.STRING },
              cost: { type: Type.STRING },
              realImageUrl: { type: Type.STRING, description: "Direct URL to an image from the source website if found" },
              imageKeyword: { type: Type.STRING, description: "Highly specific keyword for search, e.g. 'Mong Kok street food stall'" },
              sourceUrl: { type: Type.STRING },
              difficulty: { type: Type.STRING, enum: ['Easy', 'Moderate', 'Challenging'] }
            },
            required: ['title', 'location', 'district', 'description', 'address', 'sourceUrl', 'date', 'venue']
          }
        }
      },
    });

    const parsed = JSON.parse(response.text) as any[];
    return parsed.map(item => {
      // If a real image URL isn't found, use a verified district-specific stock image instead of random keywords
      if (!item.realImageUrl) {
        const fallbackId = DISTRICT_IMAGE_FALLBACKS[item.district] || DISTRICT_IMAGE_FALLBACKS[item.location] || 'photo-1540910419316-ce72ca97461d';
        item.realImageUrl = `https://images.unsplash.com/${fallbackId}?q=80&w=800&auto=format&fit=crop`;
      }
      return item;
    });
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
