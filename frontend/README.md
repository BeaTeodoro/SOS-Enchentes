# 🌊 SOS Enchentes

Sistema completo para gestão de abrigos, pessoas, animais, voluntários e doações em situações de emergência.

---

## 🚀 Tecnologias

### Backend

* Node.js
* Express
* PostgreSQL
* JWT (autenticação)

### Frontend

* React
* Axios
* React Router
* SCSS

---

## 📁 Estrutura do Projeto

```
sos-enchentes/
├── backend/
│   └── src/
│       ├── config/
│       ├── routes/
│       ├── middleware/
│       └── server.js
│
├── frontend/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── pages/
│       └── scss/
```
## 📡 Documentação da API

A coleção do Postman está disponível em:
https://b-teodoro-1064958.postman.co/workspace/Default-workspace~df4cf35e-270e-4cf1-8f6f-96c12b5b41d6/collection/53184404-0662a995-819b-4fae-ab83-5348f62f1bdc?action=share&source=copy-link&creator=53184404
---

## ⚙️ Como rodar o projeto

### 1. Clonar o repositório

```
git clone 
cd sos-enchentes
```

---

### 2. Rodar o Backend

```
cd backend
npm install
node src/server.js
```

Servidor rodando em:

```
http://localhost:5000
```

---

### 3. Rodar o Frontend

```
cd frontend
npm install
npm start
```

Aplicação disponível em:

```
http://localhost:3000
```

---

## 🔐 Autenticação

O sistema utiliza JWT.

### Registro

```
POST /auth/register
```

### Login

```
POST /auth/login
```

Retorna um token que deve ser enviado no header:

```
Authorization: SEU_TOKEN
```

---

## 📡 Principais Rotas

### Abrigos

* `GET /abrigos`
* `POST /abrigos` (protegida)

### Pessoas

* `GET /pessoas`
* `POST /pessoas`

### Animais

* `GET /animais`
* `POST /animais`

### Voluntários

* `GET /voluntarios`
* `POST /voluntarios`

### Doações

* `GET /doacoes`
* `POST /doacoes`

---

## ⚠️ Tratamento de Erros

O backend retorna:

* `400` → Dados inválidos / FK inválida
* `401` → Não autenticado
* `403` → Token inválido
* `409` → Dados duplicados
* `500` → Erro interno

---

## 🧪 Testes

Os testes das rotas podem ser realizados via Postman.

Casos testados:

* Rota protegida sem token (401)
* Token inválido (403)
* Dados duplicados (409)
* FK inválida (400)
* GET sem dados (array vazio)

---

## 🎯 Status do Projeto

✔ Backend completo
✔ Integração com banco
✔ Autenticação funcional

---

## 📌 Melhorias Futuras
* Finalização do frontend
* Interface mais elaborada
* Dashboard administrativo
* Deploy em produção
* Testes automatizados

---

## 👩‍💻 Autor

Projeto desenvolvido por Beatriz Teodoro
