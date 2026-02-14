
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const getExplanation = async (topic: string, context: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Explain the OT topic: "${topic}". Context: ${context}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having a little trouble connecting right now. Take a deep breath—we can try again in a moment.";
  }
};

export const chunkTask = async (complexTopic: string) => {
    const ai = getAIClient();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Break down the study of "${complexTopic}" into 5 tiny, manageable 5-minute tasks for someone with severe ADHD.`,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
      return response.text;
    } catch (error) {
      return "Unable to chunk this right now. Try focusing on just the first paragraph for 5 minutes!";
    }
  };
