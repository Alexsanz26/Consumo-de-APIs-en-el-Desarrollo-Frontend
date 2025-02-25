# Caso 5 - API de Telegram con Gemini Pro AI y SQLite

Este proyecto muestra cómo integrar un bot de Telegram con Gemini Pro AI y almacenar las conversaciones en SQLite. Sigue estos pasos para configurar tu propio bot desde cero.

##  Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (Incluye npm)
- [Ngrok](https://ngrok.com/) (Para exponer el servidor local a Internet)
- Una cuenta en [Telegram](https://telegram.org/) y haber creado un bot con [BotFather](https://t.me/BotFather)
- Una clave de API de [Gemini Pro AI](https://ai.google.dev/)

##  Estructura del Proyecto

```
/caso5-telegram-bot
│── index.html
│── server.js
│── database.js
│── .env
│── package.json
│── README.md
```

##  Instalación y Configuración

### 1.- Instalar dependencias
```bash
npm install express dotenv axios cors sqlite3 body-parser
```

### 2.- Configurar las variables de entorno
Crea un archivo `.env` en la raíz del proyecto y agrega:
```ini
TELEGRAM_BOT_TOKEN=tu_token_aqui
TELEGRAM_CHAT_ID=tu_chat_id_aqui
GEMINI_API_KEY=tu_clave_gemini_aqui
```

### 3.- Configurar SQLite
Crea un archivo `database.js` para manejar la base de datos:
```javascript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./conversaciones.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS conversaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT,
        mensaje TEXT,
        respuesta TEXT,
        fecha TEXT
    )`);
});

module.exports = db;
```

### 4.- Crear el servidor en `server.js`
```javascript
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
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function obtenerRespuestaGemini(mensaje) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(mensaje);
        return await result.response.text();
    } catch (error) {
        console.error("Error con Gemini Pro:", error);
        return "Lo siento, tuve un problema al generar una respuesta.";
    }
}

app.post('/webhook', async (req, res) => {
    const message = req.body.message;
    if (message && message.text) {
        console.log("Mensaje recibido:", message.text);
        const respuesta = await obtenerRespuestaGemini(message.text);
        await sendMessage(respuesta);
        db.run(`INSERT INTO conversaciones (usuario, mensaje, respuesta, fecha) VALUES (?, ?, ?, ?)`,
            [message.chat.username || "Desconocido", message.text, respuesta, new Date().toISOString()]);
    }
    res.sendStatus(200);
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
```

### 5.- Exponer el servidor con Ngrok
Ejecuta el siguiente comando:
```bash
ngrok http 3000
```
Copia la URL que genera Ngrok y configúrala en Telegram para recibir mensajes en tu bot:
```bash
curl -F "url=TU_NGROK_URL/webhook" https://api.telegram.org/botTU_BOT_TOKEN/setWebhook
```

### 6.- Iniciar el servidor
```bash
node server.js
```

### 7.- Consultar conversaciones almacenadas
Crea un archivo `verconversaciones.js` para visualizar los datos:
```javascript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./conversaciones.db');

db.all("SELECT * FROM conversaciones", [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(row);
    });
});

db.close();
```
Ejecuta:
```bash
node verconversaciones.js
```

##  Resultado Final
- Puedes hablar con tu bot en Telegram
- Gemini Pro responde a los mensajes
- Se guardan todas las conversaciones en SQLite


