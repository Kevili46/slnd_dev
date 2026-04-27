import {
    GoogleGenerativeAI,
    ChatSession,
    Content
} from "@google/generative-ai";
import { SYSTEM_PROMPT } from "#utils/CONSTANTS";
import { readFileSync } from "node:fs";
import path from "node:path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const filePath = path.join(process.cwd(), 'src/assets/cv.txt');
const infoFile = readFileSync(filePath, 'utf-8');

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
        if ((error as any).status == 429) {
            console.log(error);
            return "Sorry, as this service runs on free tier, the daily quota reached the limit :(";
        }
        if ((error as any).status.status == 503) {
            return "Sorry, as this service runs on free tier, your request wasn't processed due to high traffic :(";
        }
        return "Sorry, something unexpected happened :(";
    }
};