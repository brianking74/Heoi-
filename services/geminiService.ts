
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

export async function tagContent(text: string) {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Extract the most relevant "vibe tags" from this description of a Hong Kong place: "${text}". Return only a comma-separated list.`,
  });
  return response.text.split(',').map(s => s.trim());
}
