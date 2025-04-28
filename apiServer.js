import express from "express";
import cors from "cors"
import { ChatbotUser } from "./AI_chatbot/gemini.js";

const port = 4600;
const app = express();

const sessions = new Map();
const maxSessions = 10;
const maxMessages = 30;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    const _id = req.body._id;

    if (!sessions.has(_id) && sessions.size >= maxSessions) {
        res.json({ response: "Sorry, there are currently too many chats I have to reply to.\n Please try again later :)" });
        return;
    }

    if (!sessions.has(_id)) {
        sessions.set(_id, {
            chatInstance: new ChatbotUser(),
            messagesSent: 0,
            lastActive: Date.now()
        })
    } else {
        sessions.get(_id).lastActive = Date.now()
    }
    next();
})

app.post('/chat', async (req, res) => {
    const query = req.body.message;
    const _id = req.body._id;
    let answer = '';
    console.log(sessions.get(_id).messagesSent);
    if (sessions.get(_id).messagesSent >= maxMessages) {
        res.json({ response: 'You reached your message contingent!' })
        return;
    }
    try {
        answer = await sessions.get(_id).chatInstance.generateAnswer(query);
        sessions.get(_id).messagesSent++;
    } catch {
        answer = "I couldn't understand this question :("
    }
    let body = {
        response: answer
    };
    res.json(body);
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