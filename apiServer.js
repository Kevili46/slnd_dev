import express from "express";
import cors from "cors"
import { generateAnswer } from "./AI_chatbot/gemini.js";

const port = 4600;
const app = express();

const sessions = new Map();
const maxSessions = 10;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {

    if (sessions.size > maxSessions) {
        res.json({ response: "Sorry, I'm currently too busy :(" });
        return;
    }

    const _id = req.body._id;

    if (!sessions.has(_id)) {
        sessions.set(_id, {
            history: [],
            lastActive: Date.now()
        })
    }
    sessions.get(_id).lastActive = Date.now()
    next();
})

app.post('/chat', async (req, res) => {
    const query = req.body.message;
    const _id = req.body._id;
    try {
        const answer = await generateAnswer(query, sessions.get(_id).history);
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

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
setInterval(() => {
    const now = Date.now();
    sessions.forEach((session, id) => {
        if (now - session.lastActive > SESSION_TIMEOUT) {
            sessions.delete(id);
        }
    });
}, 15 * 60 * 1000);