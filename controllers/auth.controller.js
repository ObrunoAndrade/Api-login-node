const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../src/config/prisma");

async function register(req, res) {
    const { name, email, password } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Nome é obrigatório" });
    }
    if (!email) {
        return res.status(400).json({ error: "Email é obrigatório" });
    }
    if (!password) {
        return res.status(400).json({ error: "Senha é obrigatória" });
    }

    const userExists = await prisma.user.findUnique({
        where: { email }
    });

    if (userExists) {
        return res.status(409).json({ error: "Email já cadastrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: passwordHash
        }
    });

    return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email
    });
};

async function login(req, res) {
    const { email, password } = req.body;

    
    if (!email) {
        return res.status(400).json({ error: "Email é obrigatório" });
    }
    if (!password) {
        return res.status(400).json({ error: "Senha é obrigatória" });
    }
    
    const user = await prisma.user.findUnique({
    where: { email }
  });

    if (!user) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const token = jwt.sign(
        {},
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: "1d"
        }
    );

    return res.json({ token });
};

module.exports = {
    register,
    login
};