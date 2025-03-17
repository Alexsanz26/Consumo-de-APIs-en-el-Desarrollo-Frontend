# Integración de API de Telegram con IA y Almacenamiento de Conversaciones

### Descripción

Este proyecto consiste en la integración de un bot de Telegram con respuestas inteligentes proporcionadas por **Gemini Pro AI**, utilizando **Node.js**, **Express.js** y **SQLite** para el almacenamiento de conversaciones. Además, se ha implementado un widget de **Telegram Chat** mediante **Elfsight** para facilitar la interacción desde una página web.

### Objetivo

Proporcionar una plataforma donde los usuarios puedan comunicarse con el bot de Telegram desde diferentes dispositivos y recibir respuestas automatizadas utilizando inteligencia artificial.

---

# Características

- Enviar mensajes al bot desde una página web con un widget integrado.

- El bot responde a los mensajes con inteligencia artificial (Gemini Pro AI).

- Los mensajes y respuestas se almacenan en una base de datos SQLite.

- Integración con ngrok para recibir mensajes en tiempo real en un servidor local.

- Permite la interacción desde la app de Telegram en PC y móvil.

- Implementación de webhooks para recibir mensajes de Telegram en tiempo real.

- Diseño adaptable con HTML, CSS y JavaScript para una mejor experiencia de usuario.

- Código modular y optimizado para facilitar futuras modificaciones.

---

# Tecnologías Utilizadas

- **Node.js** y **Express.js** para el backend.

- **Telegram API** para la comunicación con el bot.

- **Gemini Pro AI** para respuestas inteligentes.

- **SQLite** para almacenamiento de conversaciones.

- **Ngrok** para exponer el servidor local.

- **Elfsight Telegram Chat** para la interacción web.

- **JavaScript**, **HTML** y **CSS** para la interfaz web.

- **dotenv** para la gestión segura de variables de entorno.

---

# Instalación y Configuración

1. Clonar el repositorio:

 -` git clone https://github.com/tu-usuario/caso5.gitcd caso5`

2. Instalar dependencias:

- `npm install express axios dotenv cors sqlite3 body-parser @google/generative-ai`

3. Configurar variables de entorno:

Crear un archivo .env en la carpeta del proyecto y agregar:

- `TELEGRAM_BOT_TOKEN=tu_token`

- `TELEGRAM_CHAT_ID=tu_chat_id`

- `GEMINI_API_KEY=tu_api_key`

4. Iniciar el servidor:

- `node server.js`

5. Exponer el servidor con ngrok:

- `ngrok http 3000`

Copiar la URL generada y configurarla en Telegram con:

- `curl -X POST "https://api.telegram.org/botTU_TELEGRAM_BOT_TOKEN/setWebhook?url=TU_NGROK_URL/webhook"`

6. Probar el bot desde el chat de Telegram o desde `index.html`.

---

# Uso

1. Abrir index.html y enviar un mensaje desde la web.

2. Enviar mensajes al bot desde Telegram (móvil o PC).

3. Ver las conversaciones almacenadas ejecutando:

- `node verconversaciones.js`

Luego ver logs del servidor en tiempo real para depuración:

- `node server.js`

---

# Estructura del Proyecto

Desarrollo de APIs
│-- database.js...........................# Configuración y conexión con SQLite
│-- index.html............................# Interfaz web con el widget de Telegram
│-- package.json........................# Configuración de dependencias del proyecto
│-- server.js.................................# Servidor en Node.js para procesar mensajes
│-- styles.css...............................# Estilos de la página web
│-- verconversaciones.js...........# Script para ver las conversaciones almacenadas
│-- .env........................................# Variables de entorno (no se sube a GitHub)
