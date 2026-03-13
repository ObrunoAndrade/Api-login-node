const prisma = require("../config/prisma");

exports.me =  async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: req.userId }
    });

    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.json({
        id: user.id,
        name: user.name,
        email: user.email
    });
};
