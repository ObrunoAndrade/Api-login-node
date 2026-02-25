# 🚀 API Login - Node.js + Prisma

API de autenticação e gerenciamento de usuários construída com Node.js, Prisma ORM e PostgreSQL.

---

## 🧱 Tecnologias

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Token)
- bcrypt

---

## 📂 Estrutura do Projeto

```
src/
 ├── config/
 │    └── prisma.js
 ├── routes/
 │    ├── auth.routes.js
 │    └── user.routes.js
 ├── server.js

controllers/
 ├── auth.controller.js
 └── user.controller.js

middlewares/
 └── auth.middleware.js

prisma/
 ├── schema.prisma
 └── migrations/
```

---

## 🔐 Funcionalidades

- Registro de usuário
- Login com JWT
- Proteção de rotas
- Hash de senha com bcrypt
- Validação de autenticação via middleware

---

## ⚙️ Configuração do Projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/ObrunoAndrade/Api-login-node.git
cd Api-login-node
```

---

### 2️⃣ Instalar dependências

```bash
npm install
```

---

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/database"
JWT_SECRET="sua_chave_secreta"
```

---

### 4️⃣ Rodar migrations

```bash
npx prisma migrate dev
```

---

### 5️⃣ Gerar Prisma Client

```bash
npx prisma generate
```

---

### 6️⃣ Iniciar servidor

```bash
npm run dev
```

Servidor rodando em:

```
http://localhost:3000
```

---

## 📌 Endpoints

### 🔑 Auth

| Método | Rota            | Descrição        |
|--------|-----------------|------------------|
| POST   | /auth/register  | Criar usuário    |
| POST   | /auth/login     | Login do usuário |

---

### 👤 User

| Método | Rota      | Protegida |
|--------|-----------|----------|
| GET    | /users    | ✅ JWT   |

---

## 🗄️ Banco de Dados

Modelo User:

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

---

## 🔒 Segurança

- Senhas armazenadas com hash (bcrypt)
- Autenticação via JWT
- Middleware para rotas protegidas
- Variáveis sensíveis via .env

---

## 📚 Próximos Passos

- Refresh token
- Validação com Zod ou Joi
- Logs estruturados
- Docker
- Deploy em produção

---

## 👨‍💻 Autor

Bruno Andrade  
Desenvolvedor Backend em formação 🚀
