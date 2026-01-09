
import { GoogleGenAI } from "@google/genai";
import { AIResponse, GroundingLink } from "../types";

export class GeminiService {
  /**
   * Generates a grounded response for smart city queries using Gemini with Google Maps support.
   */
  async getSmartCityHelp(query: string, cityData: any, location?: { lat: number, lng: number }): Promise<AIResponse> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const response = await ai.models.generateContent({
        // Maps grounding requires 2.5 series
        model: 'gemini-2.5-flash-latest',
        contents: `You are a Smart City Assistant for Telangana One. 
        Current user query: ${query}
        Context (City Stats): ${JSON.stringify(cityData)}
        Instructions: Use Google Maps tool to find real-time location data if requested. Be helpful, concise, and professional.`,
        config: {
          tools: [{ googleMaps: {} }, { googleSearch: {} }],
          toolConfig: location ? {
            retrievalConfig: {
              latLng: {
                latitude: location.lat,
                longitude: location.lng
              }
            }
          } : undefined
        },
      });

      const text = response.text || "I'm sorry, I couldn't generate a response.";
      const links: GroundingLink[] = [];

      // Extract grounding links
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.maps) {
            links.push({ uri: chunk.maps.uri, title: chunk.maps.title });
          } else if (chunk.web) {
            links.push({ uri: chunk.web.uri, title: chunk.web.title });
          }
        });
      }

      return { text, links };
    } catch (error) {
      console.error("Gemini Error:", error);
      return {
        text: "I'm sorry, I'm having trouble connecting to the city brain right now. Please try again later.",
        links: []
      };
    }
  }
}

export const geminiService = new GeminiService();
