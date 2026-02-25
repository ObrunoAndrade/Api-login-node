const jwt = require("jsonwebtoken");

function auth(req, res, next) {

    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ error: " token de autenticação ausente" });
    }

    const parts = header.split(" ");

    if (parts.length !== 2) {
        return res.status(401).json({ error: "Token mal formatado" });
    }

    const [type, token] = parts;

    if (type !== "Bearer" || !token) {
        return res.status(401).json({ error: "Token de autenticação invalido" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);
        req.userId = payload.sub;
        return next();
    } catch {
        return res.status(401).json({ error: "Token de autenticação invalido" });
    }
}

module.exports = auth;