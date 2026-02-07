const express = require('express');
const pedidosRoutes = require('./src/routes/pedidos.routes');

const app = express();
app.use(express.json());

app.use("/pedidos", pedidosRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
})
