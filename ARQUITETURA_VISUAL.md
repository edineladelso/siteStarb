# 📊 VISUALIZAÇÃO DA ARQUITETURA

## Fluxo de Dados - Star B

```
┌─────────────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                        │
│  (React Components, Pages, Layouts)                             │
│                                                                   │
│  ✅ app/(marketing)/page.tsx → usa recursosHome, itenssPremium  │
│  ✅ components/BibliotecaExemplo.tsx → exemplo completo         │
│  ✅ Qualquer componente pode importar de @/lib                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     CAMADA DE LÓGICA                             │
│  (Utilitários e Funções)                                        │
│                                                                   │
│  lib/utilitarios.ts → 50+ funções:                              │
│  ✅ Filtros (categoria, tipo, nível)                            │
│  ✅ Busca (livros, softwares, projetos)                         │
│  ✅ Formatação (data, preço, números)                           │
│  ✅ Validação (acesso, download, IA)                            │
│  ✅ Estatísticas (tendência, popularidade)                      │
│  ✅ Manipulação (agrupar, extrair tags)                         │
│  ✅ Cloudinary (URLs otimizadas)                                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     CAMADA DE DADOS                              │
│  (Tipos e Dados)                                                │
│                                                                   │
│  lib/tipos.ts → 20+ Interfaces TypeScript:                      │
│  ✅ Livro, Software, Projeto, Usuario, Autor                    │
│  ✅ PlanSubscricao, Subscricao, Argumento                       │
│  ✅ Enums: TipoConteudo, NivelAcesso, StatusPublicacao          │
│                                                                   │
│  lib/dados.ts → Dados de Exemplo:                               │
│  ✅ livrosExemplo (2 livros)                                     │
│  ✅ softwaresExemplo (2 softwares)                               │
│  ✅ projetosExemplo (1 projeto)                                  │
│  ✅ usuarioExemplo (1 usuário com plano)                        │
│  ✅ planosSubscricao (3 planos)                                  │
│  ✅ Navegação: categorias, menus, links                         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    CAMADA DE PERSISTÊNCIA                        │
│  (Banco de Dados)                                               │
│                                                                   │
│  lib/db/schema.ts → 12 Tabelas PostgreSQL:                      │
│  ✅ autores (criadores de conteúdo)                             │
│  ✅ usuarios (perfis com nível acesso)                          │
│  ✅ planosSubscricao (planos do sistema)                        │
│  ✅ subscricoes (assinaturas ativas)                            │
│  ✅ livros + livros_autores                                      │
│  ✅ softwares + softwares_autores                                │
│  ✅ projetos + projetos_autores                                  │
│  ✅ argumentos (artigos e textos)                                │
│  ✅ atividades_usuario (rastreamento)                           │
│                                                                   │
│  lib/db/index.ts → Funções Auxiliares:                          │
│  ✅ obterTodosOsLivros()                                         │
│  ✅ obterLivroPorId(id)                                          │
│  ✅ obterUsuarioPorEmail(email)                                  │
│  ✅ ... e mais                                                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    INFRAESTRUTURA EXTERNA                        │
│                                                                   │
│  Cloudinary (Armazenamento de Mídia):                           │
│  📁 starb/livros/ → PDFs e EPUBs                                │
│  📁 starb/capas/ → Imagens de capa (otimizadas)                 │
│  📁 starb/softwares/ → Arquivos de download                     │
│  📁 starb/projetos/ → Arquivos de projeto                       │
│  📁 starb/usuarios/ → Fotos de perfil                           │
│                                                                   │
│  PostgreSQL (Banco de Dados):                                   │
│  🔌 Conexão via Drizzle ORM                                     │
│  📊 12 tabelas com índices e foreign keys                       │
└─────────────────────────────────────────────────────────────────┘
```

## Relacionamentos do Banco de Dados

```
┌──────────────┐         ┌──────────────┐
│   autores    │◄────┬───│  livros      │
│──────────────│     │   │──────────────│
│ id (PK)      │     │   │ id (PK)      │
│ nome         │     │   │ titulo       │
│ email        │     │   │ categoria    │
│ ...          │     │   │ ...          │
└──────────────┘     │   └──────────────┘
        ▲            │
        │            └─── livros_autores
        │            
┌──────────────┐     ┌──────────────────┐
│  usuarios    │────►│ planosSubscricao │
│──────────────│     │──────────────────│
│ id (PK)      │     │ id (PK)          │
│ email        │     │ nome             │
│ nivelAcesso  │     │ preco            │
│ ...          │     │ acessoIA         │
└──────────────┘     │ acessoProjetos   │
                     │ ...              │
┌──────────────┐     └──────────────────┘
│ softwares    │◄────┐
│──────────────│     │
│ id (PK)      │     └─── softwares_autores
│ nome         │
│ versao       │
│ ...          │
└──────────────┘

┌──────────────┐     ┌──────────────┐
│  projetos    │◄────│argumentos     │
│──────────────│     │──────────────│
│ id (PK)      │     │ id (PK)      │
│ titulo       │     │ titulo       │
│ etapas (JSONB)     │ conteudo     │
│ ...          │     │ autor_id (FK)│
└──────────────┘     └──────────────┘
        ▲
        │
        └─── projetos_autores

┌──────────────────────┐
│ atividades_usuario   │
│──────────────────────│
│ id (PK)              │
│ usuario_id (FK)      │
│ tipo_atividade       │
│ recurso_id           │
│ recurso_tipo         │
│ data                 │
└──────────────────────┘
```

## Hierarquia de Tipos

```
┌─────────────────────────────────────────────────┐
│               TIPOS PRINCIPAIS                   │
└─────────────────────────────────────────────────┘

┌──────────────────────┐
│ Recurso Compartilhado │
│   (Livro, Software,   │
│    Projeto)           │
├──────────────────────┤
│ ✅ id                 │
│ ✅ titulo             │
│ ✅ descricao          │
│ ✅ tipo: Pago/Livre   │
│ ✅ urls: URLsRecursos │
│ ✅ autores: Credito[] │
│ ✅ tags: string[]     │
│ ✅ status             │
│ ✅ eNovo: boolean     │
│ ✅ estatisticas       │
│ ✅ data de criação    │
└──────────────────────┘
        ↓
    ┌─────────────────────┐
    │      LIVRO          │
    ├─────────────────────┤
    │ + ISBN/ISSN         │
    │ + Editora           │
    │ + Páginas           │
    │ + permissaoDownload │
    │ + popularidade      │
    └─────────────────────┘

    ┌─────────────────────┐
    │    SOFTWARE         │
    ├─────────────────────┤
    │ + versao            │
    │ + licenca           │
    │ + urlOficial        │
    │ + especificacoes    │
    │ + recursos          │
    └─────────────────────┘

    ┌─────────────────────┐
    │     PROJETO         │
    ├─────────────────────┤
    │ + categoria         │
    │ + etapas            │
    │ + tecnologias       │
    │ + repositorio       │
    │ + urlDemo           │
    └─────────────────────┘
```

## Permissões e Acesso

```
┌────────────────────────────────────────────────────┐
│         NÍVEIS DE ACESSO (NivelAcesso)             │
└────────────────────────────────────────────────────┘

VISITANTE (Nível 0)
├─ ✅ Ver lista de livros/softwares/projetos grátis
├─ ✅ Buscar e filtrar
├─ ✅ Ver detalhes
└─ ❌ Download
   ❌ Acesso a IA
   ❌ Conteúdo premium

USUARIO_BASICO (Nível 1)
├─ ✅ Tudo do Visitante +
├─ ✅ Download de livros/softwares grátis
├─ ✅ Criar conta e perfil
└─ ❌ Acesso a conteúdo pago
   ❌ Acesso a IA
   ❌ Projetos avançados

USUARIO_PREMIUM (Nível 2)
├─ ✅ Tudo do Básico +
├─ ✅ Download de conteúdo pago
├─ ✅ Acesso a IA
├─ ✅ Projetos avançados
├─ ✅ Limite alto de downloads
└─ ✅ Suporte prioritário

MODERADOR (Nível 3)
├─ ✅ Tudo do Premium +
├─ ✅ Editar conteúdo
├─ ✅ Gerenciar comentários
└─ ✅ Gerenciar usuários

ADMINISTRADOR (Nível 4)
├─ ✅ Tudo +
├─ ✅ Acesso completo ao sistema
├─ ✅ Gerenciar configurações
└─ ✅ Acessar logs de auditoria
```

## Fluxo de Upload Cloudinary

```
1. Usuário seleciona arquivo
              ↓
2. Cliente valida (tipo, tamanho)
              ↓
3. Upload para Cloudinary
    (usando JWT do usuário)
              ↓
4. Cloudinary retorna:
   - public_id
   - url
   - tamanho
              ↓
5. Salvar URL no banco de dados
   (tabela: livros/softwares/projetos)
              ↓
6. Componente exibe imagem/link
   com URL otimizada do Cloudinary
```

## Exemplo de Consulta Prática

```typescript
// CENÁRIO: Usuário quer baixar um livro

// 1. Verificar se livro existe
const livro = await obterLivroPorId(livroId);

// 2. Verificar se usuário pode acessar
if (!usuarioPodeAcessar(usuarioAtual, livro)) {
  // Mostrar "Acesso restrito"
  return;
}

// 3. Verificar permissão de download
const permissao = verificarPermissaoDownload(livro, usuarioAtual);
if (!permissao.permitido) {
  // Mostrar erro: permissao.motivo
  return;
}

// 4. Registrar atividade do usuário
await db.insert(actividadesUsuario).values({
  usuarioId: usuarioAtual.id,
  tipoAtividade: 'download',
  recursoId: livro.id,
  recursoTipo: 'livro',
  data: new Date(),
});

// 5. Retornar URL do Cloudinary
return livro.urls.pdf?.url;
```

## Listas de Verificação

### ✅ Implementado
- [x] Tipos TypeScript centralizados
- [x] Dados de exemplo realistas
- [x] Schema BD profissional
- [x] 50+ funções utilitárias
- [x] Configurações centralizadas
- [x] Cloudinary integrado
- [x] Segurança e permissões
- [x] Documentação completa
- [x] Exemplo funcional
- [x] Export centralizado

### ⏳ Próximos (Sugerido)
- [ ] API Routes (GET, POST, PUT, DELETE)
- [ ] Páginas dinâmicas ([id])
- [ ] Upload widget
- [ ] Autenticação (NextAuth)
- [ ] Dashboard do usuário
- [ ] Admin panel
- [ ] Busca em tempo real
- [ ] Sistema de comentários
- [ ] Avaliações do usuário
- [ ] Geração de relatórios

## Tamanhos do Código

```
tipos.ts               ≈ 600 linhas   (Tipos)
dados.ts               ≈ 450 linhas   (Dados)
utilitarios.ts         ≈ 800 linhas   (Funções)
configuracao.ts        ≈ 300 linhas   (Config)
db/schema.ts           ≈ 350 linhas   (Banco)
db/index.ts            ≈ 50 linhas    (Helpers)
lib/index.ts           ≈ 15 linhas    (Exports)

TOTAL                  ≈ 2.500 linhas de código organizado
```

## Performance

### Índices no Banco de Dados
```sql
✅ autores(email)
✅ usuarios(email)
✅ livros(categoria, tipo, isbn)
✅ softwares(categoria, tipo)
✅ projetos(categoria, tipo)
```

### Cache Frontend
```typescript
✅ useMemo para filtros
✅ useCallback para funções
✅ Revalidação sob demanda
```

### Cloudinary Optimization
```
✅ Redimensionamento automático
✅ Formato automático (WebP)
✅ Compressão qualidade
✅ Cache CDN global
```

---

**Arquitetura profissional, escalável e documentada.** 🚀
