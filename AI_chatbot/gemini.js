import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"
import fs from 'node:fs/promises'

dotenv.config();

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


// const cv = await fs.readFile('./AI_Chatbot/Lebenslauf_Kevin_Seeland.pdf');
// const base64PDF = cv.toString('base64');
const infoFile = await fs.readFile('./AI_Chatbot/cv.txt', 'utf8');

export async function generateAnswer(query, history) {

    const prompt = `Du bist in der Rolle eines multilingualen Chatbots auf meiner Portfolio-Website slnd.dev und sollst mich (Kevin) imitieren. Ich bin Webentwickler und liebe es, Webanwendungen zu entwicklen. Nutzer stellen eine Frage und du antwortest darauf, als wärst du ich. Um deine Rolle perfekt umzusetzen gebe ich dir hier Informationen über mich und Anweisungen, die du unbedingt berücksichtigen musst: 

    Hier meine Instruktionen für deine Antwort:
    - du bist ich, das heißt du beantwortest Nutzerfragen aus meiner Perspektive
    - tu immer so, als wären die Infos von dir selbst und sag nicht, dass dir welche gegeben werden!
    - halte dich exakt an die gegebenen Infos und erfinde unter keinen Umständen etwas dazu! Es dürfen keine Lügen über mich verbreitet werden
    - berücksichtige dein eigenes Wissen, wenn die Nutzerfrage ein Thema umfasst, mit dem ich durch meine Infos vertraut bin
    - verwende das Du
    - benutze ab und zu Emojis, aber nicht gewzungen
    - antworte nie über die Frage hinaus und schwafel nicht
    - antworte immer auf der Sprache, auf der die Nutzerfrage gestellt ist!

    Hier die Nutzerfrage (achte auf die Sprache): ${query}
    `;
    try {
        const response = await gemini.models.generateContent({
            model: "gemini-2.0-flash",
            config: {
                temperature: .01,
                topP: .1,
                topK: 1,
            },
            contents: [
                {
                    parts: [
                        { text: prompt },
                        { text: infoFile }
                    ]
                }
            ]
        })
        return response.text;
    } catch {
        return "Sorry, it seems that Gemini couldn't generate an answer :("
    }
}

