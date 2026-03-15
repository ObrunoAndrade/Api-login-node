# 🚀 Auth API - Node.js + Prisma + PostgreSQL

API de autenticação completa com JWT, Refresh Token e rotas protegidas, construída com Node.js, Express, Prisma ORM e PostgreSQL seguindo arquitetura em camadas.

---

## 🧱 Tecnologias utilizadas

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* JWT (JSON Web Token)
* bcrypt
* dotenv
* Zod
* Middleware de autenticação
* Middleware de erro
* Logger de requisições

---

## 📂 Arquitetura do projeto

Estrutura organizada seguindo padrão profissional em camadas:

```
src/
 ├── config/
 │    └── prisma.js
 │
 ├── controllers/
 │    ├── auth.controller.js
 │    └── user.controller.js
 │
 ├── services/
 │    └── auth.service.js
 │
 ├── repositories/
 │    └── user.repository.js
 │
 ├── routes/
 │    ├── auth.routes.js
 │    └── user.routes.js
 │
 ├── middlewares/
 │    ├── auth.middleware.js
 │    ├── error.middleware.js
 │    ├── logger.middleware.js
 │
 ├── validators/
 │    └── auth.validator.js
 │
 └── server.js

prisma/
 ├── schema.prisma
 └── migrations/

logs/
```

---

## 🔐 Funcionalidades

✅ Registro de usuário
✅ Login com JWT
✅ Refresh Token
✅ Logout
✅ Rotas protegidas
✅ Middleware de autenticação
✅ Middleware de erro global
✅ Logger de requisições
✅ Hash de senha com bcrypt
✅ Prisma ORM com PostgreSQL
✅ Arquitetura em camadas
✅ Validação de dados

---

## ⚙️ Configuração do projeto

### 1️⃣ Clonar repositório

```
git clone https://github.com/ObrunoAndrade/Api-login-node.git
cd Api-login-node
```

---

### 2️⃣ Instalar dependências

```
npm install
```

---

### 3️⃣ Criar arquivo .env

Crie um arquivo `.env` na raiz:

```
PORT=3000

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/api"

JWT_SECRET="secret"
JWT_REFRESH_SECRET="refresh_secret"
```

---

### 4️⃣ Rodar banco de dados

```
npx prisma db push
```

ou

```
npx prisma migrate dev
```

---

### 5️⃣ Gerar Prisma Client

```
npx prisma generate
```

---

### 6️⃣ Iniciar servidor

```
npm run dev
```

Servidor:

```
http://localhost:3000
```

---

## 📌 Endpoints

### 🔑 Auth

| Método | Rota           | Descrição        |
| ------ | -------------- | ---------------- |
| POST   | /auth/register | Criar usuário    |
| POST   | /auth/login    | Login            |
| POST   | /auth/refresh  | Gerar novo token |
| POST   | /auth/logout   | Logout           |

---

### 👤 User

| Método | Rota | Protegida |
| ------ | ---- | --------- |
| GET    | /me  | ✅ JWT     |

Header obrigatório:

```
Authorization: Bearer TOKEN
```

---

## 🗄️ Modelo de Usuário

```
model User {
  id           String   @id @default(uuid())
  name         String
  email        String   @unique
  password     String
  refreshToken String?
  createdAt    DateTime @default(now())
}
```

---

## 🔒 Segurança

* Senhas com hash usando bcrypt
* JWT com expiração
* Refresh token salvo no banco
* Middleware de autenticação
* Validação de dados
* Variáveis sensíveis via .env

---

## 📄 Logs

Logs são salvos em:

```
logs/combined.log
logs/error.log
```

---

## 📦 Scripts

```
npm run dev
npm start
npx prisma studio
```

---

## 🎯 Objetivo do projeto

Projeto criado para praticar:

* Backend com Node.js
* Prisma ORM
* Autenticação com JWT
* Refresh Token
* Arquitetura profissional
* Boas práticas de API

---

## 👨‍💻 Autor

Bruno Andrade
Backend Developer 🚀
