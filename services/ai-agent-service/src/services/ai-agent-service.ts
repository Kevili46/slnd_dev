import {
    GoogleGenerativeAI,
    ChatSession,
    Content
} from "@google/generative-ai";
import { history } from "@utils/chatHistory";
import { SYSTEM_PROMPT } from "@utils/CONSTANTS";
import { readFileSync } from "node:fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const infoFile = readFileSync('src/assets/cv.txt', 'utf-8');

const systemPrompt: Content = {
    role: 'system',
    parts: [
        {
            text: `${SYSTEM_PROMPT}
            persönliche Infos:
            ${infoFile}
            `,
        }
    ]
}

const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite-preview",
    generationConfig: {
        temperature: 0.2,
        topP: 0.1,
        topK: 1,
    },
    systemInstruction: systemPrompt,
});

export const createChatSession = () => {
    return model.startChat({ history: [] });
};

export const sendMessage = async (session: ChatSession, query: string): Promise<string> => {
    try {
        const result = await session.sendMessage(query);
        return result.response.text() || "I cannot answer that.";
    } catch (error) {
        return 'Sorry, I am having trouble right now.';
    }
};