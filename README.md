# API Node Jitterbit

API REST para gerenciamento de pedidos, com autenticação JWT e persistência em PostgreSQL.

## Pré-requisitos

- **Node.js** 24.14.0 ou superior
- **Docker** e **Docker Compose**

## Configuração

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/matheus-hi-dias/api-node-jitterbit.git
   cd api-node-jitterbit
   ```

2. **Configure as variáveis de ambiente:**

   Copie o arquivo `.env.example` para `.env` e ajuste se necessário.

   ```bash
   cp .env.example .env
   ```

3. **Suba o banco de dados com Docker:**

   ```bash
   npm run docker:up
   ```

   Isso criará o banco PostgreSQL e as tabelas necessárias.

4. **Instale as dependências do Node:**

   ```bash
   npm install
   ```

5. **Inicie a API:**

   ```bash
   npm run dev
   ```

## Uso

- Acesse a API em: `http://localhost:3000`
- Use a rota `/login` para obter um token JWT (usuário e senha devem estar cadastrados no banco).
- Todas as rotas de pedidos exigem autenticação via token JWT.
- A coleção Postman para testar a API está disponível na pasta `Docs`.

## Scripts úteis

- `npm run docker:up` — Sobe o banco de dados
- `npm run docker:down` — Para o banco de dados
- `npm run docker:reset` — Reseta o banco de dados

---

Se você quiser adicionar exemplos de requisições ou instruções para criar um usuário admin inicial, me avise!
