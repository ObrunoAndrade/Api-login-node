const prisma = require("../config/prisma");

async function findByEmail(email) {
    return prisma.user.findUnique({
        where: { email }
    })
}

async function createUser(data) {
    return prisma.user.create({
        data
    });
}

async function findById(id) {
    return prisma.user.findUnique({
        where: { id }
    });
}

async function updateRefreshToken(id, refreshToken) {
    return prisma.user.update({
        where: { id },
        data: { refreshToken }
    });
}
module.exports = {
    findByEmail,
    createUser,
    findById,
    updateRefreshToken
};
