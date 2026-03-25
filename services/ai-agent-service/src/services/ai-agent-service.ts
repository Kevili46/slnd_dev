import {
    GoogleGenerativeAI,
    ChatSession,
    Content
} from "@google/generative-ai";
import { SYSTEM_PROMPT } from "@utils/CONSTANTS";
import { history } from "@utils/chatHistory";
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

const chat: ChatSession = model.startChat({ history });

export const sendMessage = async (query: string, signal?: AbortSignal): Promise<string> => {
    try {
        const result = await chat.sendMessage(query, { signal });
        const response = result.response;
        const text: string = response.text();

        if (!text) {
            return "I cannot answer that."
        }

        return text;

    } catch (error: any) {
        console.error(error);
        return 'Sorry, I cannot answer at the moment. Ask me again later :)';
    }
};