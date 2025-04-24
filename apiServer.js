import { GoogleGenAI } from "@google/genai";
import express from "express";
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();

const gemini = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const port = 4600;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/chat', async (req, res) => {
    const query = req.body.message;
    try {
        const answer = await generateAnswer(query);
        let body = {
            response: answer
        };
        res.json(body);
    } catch (error) {
        res.status(500).json({ error: "Failed to generate response" });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

async function generateAnswer(query) {
    const response = await gemini.models.generateContent({
        model: "gemini-2.0-flash",
        contents: query
    })
    return response.text;
}