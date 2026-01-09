
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API Key is missing in environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

export async function generateItinerary(
  prompt: string,
  userContext: { persona: string; interests: string[]; budget: string }
) {
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
}

export async function fetchLiveExperiences(vibe: string) {
  const ai = getAIClient();
  // Using gemini-2.5-flash for Maps grounding support
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Find 3 real-world, current "hidden gem" experiences or events in Hong Kong that fit the vibe: "${vibe}". 
               Include specific locations, estimated costs, and a brief description. 
               Look for sources like TimeOut HK or DiscoverHK. 
               Return the data as a JSON array of objects.`,
    config: {
      tools: [{ googleSearch: {} }, { googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: 22.2855, // Center on Hong Kong (Central)
            longitude: 114.1577
          }
        }
      },
      // Note: While the prompt says 'Return as JSON', 
      // we must be careful because maps grounding output might be text.
      // We will ask for a specific format and parse it.
    },
  });

  const text = response.text || "";
  // Extract URLs from grounding chunks
  const sourceUrls = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.map((chunk: any) => chunk.web?.uri || chunk.maps?.uri)
    .filter(Boolean) || [];

  return {
    rawText: text,
    sources: sourceUrls
  };
}
