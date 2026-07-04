# Martha Angelo — Setup local

## ⚡ Setup em 3 passos

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações (mínimo: NEXTAUTH_SECRET e ADMIN_EMAIL/PASSWORD)

# 3. Criar banco e popular com dados iniciais
npx prisma migrate dev --name init
npm run db:seed

# 4. Rodar o servidor
npm run dev
```

Acesse: **http://localhost:3000**

---

## 🔐 Painel admin

URL: **http://localhost:3000/admin**

Configure no `.env`:
```
ADMIN_EMAIL=seu@email.com
ADMIN_PASSWORD=sua-senha-segura
```

---

## 💳 Mercado Pago (pagamentos)

1. Acesse https://www.mercadopago.com.br/developers
2. Crie um aplicativo
3. Copie o **Access Token** e a **Public Key**
4. Cole no `.env`:

```
MP_ACCESS_TOKEN=APP_USR-xxxx
MP_PUBLIC_KEY=APP_USR-xxxx
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-xxxx
```

> Use as credenciais de **teste** (`TEST-xxx`) para validar sem cobrar de verdade.

---

## 📧 E-mails (Resend)

1. Acesse https://resend.com e crie uma conta gratuita
2. Crie uma API key
3. Cole no `.env`:

```
RESEND_API_KEY=re_xxxx
RESEND_FROM=Martha Angelo <contato@seudominio.com>
```

> Sem configurar, os agendamentos funcionam normalmente — só não enviará e-mails de confirmação.

---

## 🚀 Deploy no Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login e deploy
vercel

# Adicionar variáveis de ambiente no dashboard do Vercel
# Settings → Environment Variables → adicionar todas do .env
```

Para banco em produção, use **Vercel Postgres** (gratuito) ou **Supabase**:
- Vercel Postgres: adiciona `DATABASE_URL` automaticamente
- Supabase: `DATABASE_URL=postgresql://...` (mude `provider = "postgresql"` no schema.prisma)

---

## 📁 Estrutura

```
app/
  page.tsx              → Landing page
  sobre/                → Sobre Martha
  sessoes/              → Tipos de sessão
  agendar/              → Fluxo de agendamento
  blog/                 → Blog + posts
  admin/                → Painel (protegido)
    posts/              → Gestão de posts
    agenda/             → Todos os agendamentos
components/
  BookingFlow.tsx        → Calendário + formulário + pagamento
  Navbar.tsx / Footer.tsx
lib/
  prisma.ts              → Cliente do banco
  auth.ts                → NextAuth config
  email.ts               → Envio de e-mails
prisma/
  schema.prisma          → Estrutura do banco
  seed.ts                → Dados iniciais
```
