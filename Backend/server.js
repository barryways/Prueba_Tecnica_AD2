const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//Mis rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/clients", require("./routes/clients"));
app.use("/api/purchases", require("./routes/purchases"));
app.use("/api/offers", require("./routes/offers"));

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
