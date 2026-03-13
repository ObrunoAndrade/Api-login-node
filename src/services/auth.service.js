const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRepository = require("../repositories/user.repository");
const AppError = require("../errors/AppError");

async function register({ name, email, password }) {

    if (!name) {
        throw new AppError("Nome é obrigatório");
    }

    if (!email) {
        throw new AppError("Email é obrigatório");
    }

    if (!password) {
        throw new AppError("Senha é obrigatória");
    }

    const userExists = await userRepository.findByEmail(email);

    if (userExists) {
        throw new AppError("Email já cadastrado");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser({
        name,
        email,
        password: passwordHash
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
}

async function login({ email, password }) {

    if (!email) {
        throw new AppError("Email é obrigatório");
    }

    if (!password) {
        throw new AppError("Senha é obrigatória");
    }

    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new AppError("Email ou senha inválidos");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new AppError("Email ou senha inválidos");
    }

    const token = jwt.sign(
        {},
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: "15m"
        }
    );

    const refreshToken = jwt.sign(
        {},
        process.env.JWT_REFRESH_SECRET,
        {
            subject: user.id,
            expiresIn: "7d"
        }
    );

    await userRepository.updateRefreshToken(
        user.id,
        refreshToken
    );

    return {
        token,
        refreshToken
    };
}

async function refreshToken(refreshToken) {

    if (!refreshToken) {
        throw new AppError("Refresh token é obrigatório");
    }

    let payload;

    try {

        payload = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

    } catch (error) {

        throw new AppError("Refresh token inválido");

    }

    const user =
        await userRepository.findById(payload.sub);

    if (!user) {
        throw new AppError("Usuário não encontrado");
    }

    if (user.refreshToken !== refreshToken) {
        throw new AppError("Refresh token inválido", 401);
    }

    const newToken = jwt.sign(
        {},
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: "15m"
        }
    );

    return {
        token: newToken
    };
}

module.exports = {
    register,
    login,
    refreshToken
};