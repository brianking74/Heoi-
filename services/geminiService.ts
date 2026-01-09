
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === 'undefined') {
    throw new Error("API_KEY_MISSING");
  }
  return new GoogleGenAI({ apiKey });
};

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
        
        Generate a quirky, fun, and annotated Hong Kong itinerary. 
        Use local slang (like "lah", "add oil", "ding ding") but stay readable.
        Focus on off-the-beaten-path locations.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: 'A fun overview of the plan.' },
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

export async function fetchLiveExperiences(vibe: string) {
  try {
    const ai = getAIClient();
    // Maps grounding is specific to 2.5 series. 
    // If it fails, it might be due to project-level permissions for grounding tools.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find 3 current "hidden gem" experiences or events in Hong Kong for the vibe: "${vibe}". 
                 Include locations and descriptions. Focus on authenticity.`,
      config: {
        tools: [{ googleSearch: {} }, { googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: 22.2855,
              longitude: 114.1577
            }
          }
        }
      },
    });

    const text = response.text || "No details found for this specific vibe right now.";
    const sourceUrls = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web?.uri || chunk.maps?.uri)
      .filter(Boolean) || [];

    return {
      rawText: text,
      sources: sourceUrls
    };
  } catch (error: any) {
    console.error("Live Sync Error:", error);
    throw error;
  }
}
