# 🔐 Sistema de Autenticação - Mapeamento Completo

## 📋 Resumo Executivo

Sistema de autenticação integrado com **Supabase Auth** (email, Google, GitHub) sincronizado com banco de dados **Drizzle ORM**. Implementa roles (admin/user) e proteção de rotas.

---

## 🗂️ Arquitetura e Fluxo

```
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE AUTH                            │
│  (Email, Google OAuth, GitHub OAuth)                        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                   CALLBACK ROUTE                            │
│  /app/auth/callback/route.ts → syncUserProfile()            │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│              DRIZZLE DB (PostgreSQL)                        │
│  profiles table: id, email, nome, avatarUrl, role, provider │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│            SERVER COMPONENTS & MIDDLEWARE                   │
│  getCurrentUser() → Verificar roles → Proteger rotas        │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Arquivos do Sistema de Autenticação

### 1️⃣ **Database Schema**
- **Arquivo:** [lib/drizzle/db/schema/profile.ts](lib/drizzle/db/schema/profile.ts)
- **Tabela:** `profiles`
- **Campos:**
  - `id` (UUID, PK) - Sincronizado com `auth.users` do Supabase
  - `email` (TEXT, UNIQUE) - Email único
  - `nome` (TEXT) - Nome do usuário
  - `apelido` (TEXT) - Apelido opcional
  - `avatarUrl` (TEXT) - Avatar do usuário
  - `role` (TEXT) - "admin" | "user" (default: "user")
  - `provider` (TEXT) - "email" | "google" | "github"
  - `createdAt`, `updatedAt` (TIMESTAMPS)

### 2️⃣ **Validação Schemas**
- **Arquivo:** [lib/drizzle/validations/auth.schema.ts](lib/drizzle/validations/auth.schema.ts)
- **Schemas:**
  - `loginSchema` - Email + Password
  - `registerSchema` - Email + Password + Nome
  - `insertProfileSchema` - Schema para inserir profile no BD

### 3️⃣ **Supabase Clients**
- **Server Client:** [lib/supabase/server.ts](lib/supabase/server.ts)
  - Usado em Server Components e Server Actions
  - Gerencia cookies e sessões
  
- **Browser Client:** [lib/supabase/client.ts](lib/supabase/client.ts)
  - Usado em Client Components (futuro)

### 4️⃣ **Auth Actions (Supabase)**
- **Arquivo:** [lib/supabase/auth/auth-actions.ts](lib/supabase/auth/auth-actions.ts)
- **Funções:**
  - `registrarComEmail(formData)` - Registra usuário com email/senha
  - `fazerLoginComEmail(formData)` - Login com email/senha
  - `loginComGoogle()` - OAuth com Google
  - `loginComGithub()` - OAuth com GitHub

### 5️⃣ **User Server Actions**
- **Arquivo:** [lib/actions/user.actions.ts](lib/actions/user.actions.ts) ✨ **NOVO**
- **Funções:**
  - `getCurrentUser()` - Retorna usuário autenticado atual
  - `logout()` - Faz logout do usuário
  - `isAdmin()` - Verifica se o usuário é admin

### 6️⃣ **Auth Sync Action**
- **Arquivo:** [lib/actions/auth-sync.actions.ts](lib/actions/auth-sync.actions.ts)
- **Função:** `syncUserProfile()`
  - Sincroniza usuário do Supabase com banco local
  - Criar novo perfil ou atualizar perfil existente
  - Chamada após OAuth callback ou email registration

### 7️⃣ **Callback Route**
- **Arquivo:** [app/auth/callback/route.ts](app/auth/callback/route.ts)
- **Fluxo:**
  1. Supabase redireciona aqui após OAuth
  2. Troca código por sessão (`exchangeCodeForSession`)
  3. Sincroniza profile no BD
  4. Redireciona para `/dashboard` ou rota anterior

### 8️⃣ **Middleware de Proteção**
- **Arquivo:** [middleware.ts](middleware.ts) ✨ **NOVO**
- **Funcionalidades:**
  - Protege rotas privadas (/admin, /perfil, /dashboard)
  - Redireciona para login se não autenticado
  - Redireciona para home se já logado em /login ou /registro
  - Verifica presença de cookies de sessão

### 9️⃣ **Pages - Login**
- **Arquivo:** [app/(acountLogin)/login/page.tsx](app/(acountLogin)/login/page.tsx) ✨ **CORRIGIDO**
- **Features:**
  - Login com email/senha
  - Login com Google (ícone correto SVG)
  - Login com GitHub
  - Links para registro e admin-setup

### 🔟 **Pages - Registro**
- **Arquivo:** [app/(acountLogin)/registro/page.tsx](app/(acountLogin)/registro/page.tsx) ✨ **CORRIGIDO**
- **Features:**
  - Registro com email/senha
  - Validação de força de senha
  - Mensagens de erro/sucesso
  - Link para confirmação de email

### 1️⃣1️⃣ **NavUser Component**
- **Arquivo:** [components/layout/aside/nav-user.tsx](components/layout/aside/nav-user.tsx) ✨ **CORRIGIDO**
- **Features:**
  - Exibe informações do usuário logado
  - Avatar com iniciais
  - Mostra badge "Admin" se for admin
  - Botão de logout funcional
  - Link para perfil e dashboard admin

### 1️⃣2️⃣ **AppSidebar Component**
- **Arquivo:** [components/layout/aside/app-sidebar.tsx](components/layout/aside/app-sidebar.tsx) ✨ **CORRIGIDO**
- **Props:**
  - `user: CurrentUser | null` - Usuário autenticado
- **Features:**
  - Integra NavUser com dados do usuário
  - Mostra fallback se não autenticado

### 1️⃣3️⃣ **Public Layout**
- **Arquivo:** [app/(public)/layout.tsx](app/(public)/layout.tsx) ✨ **CORRIGIDO**
- **Features:**
  - Server component que busca usuário atual
  - Passa usuário ao AppSidebar
  - Sincroniza estado de autenticação

### 1️⃣4️⃣ **Admin Layout**
- **Arquivo:** [app/(private)/admin/layout.tsx](app/(private)/admin/layout.tsx) ✨ **CORRIGIDO**
- **Proteção:**
  - Verifica se usuário está autenticado
  - Verifica se usuário tem role "admin"
  - Redireciona para login ou home se não autorizado

### 1️⃣5️⃣ **Admin Setup**
- **Arquivo:** [app/(public)/admin-setup/page.tsx](app/(public)/admin-setup/page.tsx)
- **Ação:** [lib/actions/admin-setup.ts](lib/actions/admin-setup.ts)
- **Features:**
  - Promove usuário a admin com código secreto
  - Só funciona com `ADMIN_SETUP_SECRET` no .env

---

## 🔄 Fluxos de Autenticação

### 📧 **Fluxo 1: Login com Email/Senha**

```
1. Usuário preenche form (/login)
2. fazerLoginComEmail() envia para Supabase Auth
3. Supabase valida credenciais
4. Session cookie criado
5. Redireciona para /admin
```

### 🌐 **Fluxo 2: Login com Google/GitHub**

```
1. Usuário clica "Continuar com Google"
2. loginComGoogle() inicia OAuth flow
3. Usuário autoriza na tela do Google
4. Supabase redireciona para /auth/callback?code=...
5. callback/route.ts troca código por sessão
6. syncUserProfile() cria/atualiza profile no BD
7. Redireciona para /dashboard
```

### ✍️ **Fluxo 3: Registro com Email/Senha**

```
1. Usuário preenche form (/registro)
2. registrarComEmail() envia para Supabase Auth
3. Supabase cria usuário e envia email de confirmação
4. Redireciona para /registro/confirmacao
5. Usuário clica link no email para confirmar
6. Session criada automaticamente
```

### 👤 **Fluxo 4: Sincronização de Usuário (Server)**

```
1. getCurrentUser() chamado no layout
2. Busca user na sessão Supabase (getUser())
3. Consulta profile no Drizzle BD
4. Retorna dados completos (incluindo role)
5. Passado ao AppSidebar
```

### 🚪 **Fluxo 5: Logout**

```
1. Usuário clica "Sair" no dropdown
2. logout() executa supabase.auth.signOut()
3. Session cookie removido
4. Redireciona para /login
5. router.refresh() limpa cache
```

---

## 🔑 Variáveis de Ambiente Necessárias

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key

# Admin Setup Secret
ADMIN_SETUP_SECRET=seu-codigo-secreto-para-promover-admin

# Site URL (para callbacks)
NEXT_PUBLIC_SITE_URL=http://localhost:3000 (dev) | https://seusite.com (prod)
```

---

## 🛡️ Proteção de Rotas

### Middleware (`middleware.ts`)
- ✅ Protege `/admin`, `/perfil`, `/dashboard`
- ✅ Redireciona não-autenticados para login
- ✅ Redireciona autenticados de `/login` para `/`

### Admin Layout (`app/(private)/admin/layout.tsx`)
- ✅ Verifica `user.role === "admin"`
- ✅ Redireciona para home se não admin
- ✅ Redireciona para login se não autenticado

---

## 🎯 Roles e Permissões

### Role: **"user"** (Padrão)
- ✅ Acessar home `/`
- ✅ Acessar biblioteca `/biblioteca`
- ✅ Acessar artigos, livros, softwares
- ❌ Acessar `/admin`
- ❌ Criar/editar conteúdo

### Role: **"admin"**
- ✅ Tudo que "user" pode fazer
- ✅ Acessar `/admin`
- ✅ Ver dashboard de analytics
- ✅ Criar/editar/deletar livros, artigos, projetos, softwares
- ✅ Promover outros usuários a admin

---

## 📱 Componentes UI

### NavUser
```tsx
<NavUser 
  user={{ name, email, avatar }}
  role="admin" // opcional
  classNameSideBarMenu={...}
/>
```

### AppSidebar
```tsx
<AppSidebar user={currentUser} {...props} />
```

---

## ✅ Checklist de Implementação

- ✅ Database schema com profiles
- ✅ Validação schemas Zod
- ✅ Supabase clients (server + browser)
- ✅ Auth actions (email, Google, GitHub)
- ✅ User actions (getCurrentUser, logout, isAdmin)
- ✅ Sync profile after auth
- ✅ Callback route para OAuth
- ✅ Middleware de proteção
- ✅ Login page com 3 métodos + ícone Google correto
- ✅ Registro page com validação
- ✅ NavUser com logout funcional
- ✅ AppSidebar com usuário autenticado
- ✅ Admin layout com proteção de role
- ✅ Admin setup para promover a admin

---

## 🔗 Testes Recomendados

1. **Email/Senha**
   - [ ] Registrar novo usuário
   - [ ] Receber email de confirmação
   - [ ] Confirmar email
   - [ ] Fazer login
   - [ ] Dados aparecem no sidebar
   - [ ] Logout funciona

2. **Google OAuth**
   - [ ] Clica em "Continuar com Google"
   - [ ] Conecta com Google
   - [ ] Dados do Google sincronizam (nome, avatar)
   - [ ] Role padrão "user" atribuído
   - [ ] Redireciona para dashboard

3. **GitHub OAuth**
   - [ ] Clica em "Continuar com GitHub"
   - [ ] Conecta com GitHub
   - [ ] Dados do GitHub sincronizam
   - [ ] Criado profile no BD

4. **Admin**
   - [ ] User não-admin acessa `/admin` → redireciona
   - [ ] Promove user a admin com código
   - [ ] Admin acessa dashboard
   - [ ] Admin vê badge "Admin" no sidebar

5. **Proteção**
   - [ ] Não-autenticado acessa `/admin` → redireciona para login
   - [ ] Logado acessa `/login` → redireciona para home
   - [ ] Middleware funciona corretamente

---

## 📝 Notas Importantes

1. **Session Management:**
   - Supabase gerencia cookies automaticamente
   - Middlewares leem cookies para validar sessão

2. **Sincronização:**
   - Após OAuth, profile é criado/atualizado no Drizzle
   - dados do Supabase Auth + BD local
   - Avatar vem do OAuth provider ou é null

3. **Avatar:**
   - Se não disponível, usa fallback `/img/star.webp`
   - Se tiver, exibe do provider

4. **Timezone:**
   - Todos os timestamps em UTC
   - `updatedAt` atualizado automaticamente no Drizzle

---

Documentação atualizada: **16 de fevereiro de 2026**
