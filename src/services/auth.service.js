const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");
const AppError = require("../errors/AppError")

async function register({ name, email, password }) {

    if (!name) {
        throw new AppError("Nome é obrigatório");
    };
    if (!email) {
        throw new AppError("Email é obrigatório", 409);
    };
    if (!password) {
        throw new AppError("Senha é obrigatória");
    };

    const userExists = await userRepository.fincByEmail(email);

    if (userExists) {
        throw new AppError("Email já cadastrado");
    };

    const passwordHasj = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser({
        name,
        email,
        password: passwordHasj
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
    };
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

    const tokwn = jwt.sign(
        {},
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: "1d"
        }
    );

    return { token };
};

module.exports = {
    register,
    login
}; 