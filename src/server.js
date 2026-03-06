// importação das bibliotecas necessárias
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const erroMiddleware = require ("./middlewares/error.middleware")
const loggerMiddleware = require("./middlewares/logger.midddleware");



dotenv.config();

// criação do servidor express
const app = express();


// configuração do servidor para usar CORS e JSON
app.use(cors());

// configuração do servidor para interpretar requisições com corpo em formato JSON
app.use(express.json());

app.use(loggerMiddleware);

/* ======================
   Registro das Rotas
====================== */

app.use("/auth", require("./routes/auth.routes"));
app.use("/", require("./routes/user.routes"));

app.use(erroMiddleware);

// middleware de erro. erros claros devolvem erro 400 ( erros genericos 500)
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {

        return res.status(400).json({ error: "JSON inválido no body" });
    }

    console.error(err);
    return res.status(500).json({ error: "Erro interno do servidor" });
});

// definição da porta do servidor 
const PORT = process.env.PORT || 3000;


//inicialização do servidor na porta definida
app.listen(PORT, () => {

    console.log(`Api rodando em http://localhost:${PORT}`);
});