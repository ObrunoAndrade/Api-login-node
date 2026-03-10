const authService = require('../services/auth.service');
const { loginSchema } = require('../validator/auth.validator');

async function register(req, res) {
    try {
        const result = await authService.register(req.bdy);
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            error: parsed.error.issues[0].message
        });
    }
    try {
        const result = await authService.login(req.body);
        return res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login
};