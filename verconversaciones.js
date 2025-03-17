const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./conversaciones.db');

db.all("SELECT id, usuario, mensaje, respuesta, fecha FROM conversaciones", (err, rows) => {
    if (err) {
        console.error("Error al obtener datos:", err.message);
    } else {
        console.log("\n Conversaciones Guardadas \n");
        rows.forEach(row => {
            console.log("----------------------------------------------------");
            console.log(` ID: ${row.id}`);
            console.log("----------------------------------------------------");
            console.log(` Usuario: ${row.usuario}`);
            console.log("----------------------------------------------------");
            console.log(` Mensaje: ${row.mensaje}`);
            console.log("----------------------------------------------------");
            console.log(` Respuesta: ${row.respuesta}`);
            console.log("----------------------------------------------------");
            console.log(` Fecha: ${row.fecha}`);
            console.log("----------------------------------------------------");
        });
    }
    db.close();
});
