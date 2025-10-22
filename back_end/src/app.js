import express from "express";
import cors from "cors";
import imovelRoutes from "./imovel/routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// rotas
app.use("/imoveis", imovelRoutes);

// health check
app.get("/health", (req, res) => res.json({ message: "ok" }));

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
