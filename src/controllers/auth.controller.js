const authService = require('../services/auth.service');

async function register(req, res) {
    try {
        const result = await authService.register(req.bdy);
        return res.status(201).json(result);        
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

async function login(req, res) {
    try{
        const result = await authService.login(req.body);
        return res.json(result);
    } catch (error) {
        return res.status(400).jsom({ error: error.message });
    }
}

module.exports = {
    register,
    login
};