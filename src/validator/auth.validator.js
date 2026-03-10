const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string()
    .email("Email inválido"),

  password: z
    .string()
    .min(6, "Senha precisa ter pelo menos 6 caracteres")
});

module.exports = {
  loginSchema
};