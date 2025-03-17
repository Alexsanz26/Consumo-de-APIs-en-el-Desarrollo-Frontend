require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require('./database');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
async function obtenerRespuestaGemini(mensaje) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent(mensaje);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error con Gemini Pro:", error);
        return "Lo siento, tuve un problema al generar una respuesta.";
    }
}
app.post('/webhook', async (req, res) => {
    const message = req.body.message;
    if (message && message.text) {
        console.log("Mensaje recibido:", message.text);
        let respuesta;
        if (message.text === "/start") {
            respuesta = "¡Hola! Soy tu bot. Envíame un mensaje y te responderé con IA.";
        } else {
            respuesta = await obtenerRespuestaGemini(message.text);
        }
        await sendMessage(respuesta);
        db.run(`INSERT INTO conversaciones (usuario, mensaje, respuesta, fecha) VALUES (?, ?, ?, ?)`,
            [message.chat.username || "Desconocido", message.text, respuesta, new Date().toISOString()],
            (err) => {
                if (err) {
                    console.error("Error al guardar en SQLite:", err.message);
                } else {
                    console.log("Conversación guardada correctamente.");
                }
            });
    }
    res.sendStatus(200);
});

app.post('/send-message', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "El mensaje es requerido" });
        }
        const respuesta = await obtenerRespuestaGemini(message);
        await sendMessage(respuesta);
        res.json({ success: true, message: respuesta });
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ error: "Error interno al procesar el mensaje." });
    }
});
async function sendMessage(text) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await axios.post(url, {
        chat_id: TELEGRAM_CHAT_ID,
        text: text
    });
}
app.listen(3000, () => {
    console.log("Servidor con IA (Gemini Pro) escuchando en http://localhost:3000");
});
