const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./conversaciones.db', (err) => {
    if (err) {
    console.error("❌ Error al conectar con la base de datos:", err.message);
    } else {
        console.log("✅ Conectado a la base de datos SQLite.");
    }
});
db.serialize(() => {
    db.run(`
            CREATE TABLE IF NOT EXISTS conversaciones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario TEXT,
            mensaje TEXT,
            respuesta TEXT,
            fecha TEXT
        )
    `);
    console.log("✅ Tabla 'conversaciones' creada o ya existente.");
});
module.exports = db;