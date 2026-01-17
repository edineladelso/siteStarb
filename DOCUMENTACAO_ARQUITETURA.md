# Documentação de Arquitetura de Dados - Star B

## Visão Geral

A plataforma Star B utiliza uma arquitetura centralizada de dados com separação clara entre tipos, dados, utilitários e configurações. Este documento descreve a estrutura e como utilizar o sistema.

## Estrutura de Pastas

```
lib/
├── tipos.ts              # Definições de tipos TypeScript
├── dados.ts              # Dados mock/exemplo centralizados
├── utilitarios.ts        # Funções de filtro, busca, formatação
├── configuracao.ts       # Configurações do sistema
├── utils.ts              # Utilitários gerais (cn)
├── index.ts              # Exportações centralizadas
└── db/
    ├── index.ts          # Conexão e funções DB
    └── schema.ts         # Schema do banco de dados
```

## Módulos Principais

### 1. tipos.ts

Define todas as interfaces TypeScript para:

- **Enumerações**: `TipoConteudo`, `NivelAcesso`, `StatusPublicacao`, `TipoMidia`
- **Autor e Créditos**: `Autor`, `Credito`
- **Cloudinary**: `ArmazenamentoCloudinary`, `URLsRecursos`
- **Livros**: `Livro`, `EstatisticasLivro`, `PermissaoDownload`
- **Softwares**: `Software`, `EstatisticasSoftware`, `RecursosSoftware`, `EspecificacoesSistema`
- **Projetos**: `Projeto`, `EstatisticasProjeto`, `EtapaProjeto`, `Tecnologia`
- **Usuários**: `Usuario`, `PlanSubscricao`, `Subscricao`, `PreferencesUsuario`, `ActividadeUsuario`
- **Navegação**: `ItemMenu`, `ItemNavegacao`, `LinkDocumentacao`, `Recurso`
- **Busca**: `FiltrosPesquisa`, `ResultadoPesquisa`
- **Argumentos**: `Argumento`, `SecaoTexto`
- **Configurações**: `ConfiguracaoCloudinary`, `ConfiguracaoBancoDados`, `ConfiguracaoSistema`

### 2. dados.ts

Contém dados de exemplo tipados:

- `autoresExemplo`: Lista de autores com dados completos
- `livrosExemplo`: Livros de exemplo com URLs do Cloudinary
- `softwaresExemplo`: Softwares de exemplo
- `projetosExemplo`: Projetos de exemplo com etapas
- `planosSubscricao`: Planos de acesso disponíveis
- `usuarioExemplo`: Usuário com perfil completo
- `categoriasLivros`, `categoriassoFtwares`: Menus de categorias
- `menuPrincipal`, `menuRapido`: Navegação
- `linksDocumentacao`, `opcosTema`, `recursosHome`, `itenssPremium`: Dados de UI

### 3. utilitarios.ts

Funções para:

- **Filtros**: Filtrar por categoria, tipo, nível, novos
- **Busca**: Buscar livros, softwares, projetos
- **Formatação**: Datas, preços, números
- **Validação**: Acesso, download, IA
- **Estatísticas**: Tendências, recursos populares
- **Manipulação**: Agrupar, extrair tags, obter autor principal
- **Cloudinary**: Gerar URLs otimizadas

### 4. configuracao.ts

Define:

- Configurações de Cloudinary
- Configurações de banco de dados
- Constantes (categorias, idiomas, licenças)
- Limites do sistema
- Configurações de segurança
- Presets de upload
- Mensagens de sistema
- Rotas da aplicação

### 5. db/schema.ts

Tabelas PostgreSQL:

- `autores`: Informações de autores
- `usuarios`: Perfis de usuários
- `planosSubscricao`: Planos de acesso
- `subscricoes`: Assinaturas ativas
- `livros`: Livros com todos os metadados
- `livros_autores`: Relação muitos-para-muitos
- `softwares`: Softwares com especificações
- `softwares_autores`: Relação muitos-para-muitos
- `projetos`: Projetos com etapas e tecnologias
- `projetos_autores`: Relação muitos-para-muitos
- `argumentos`: Textos e argumentos do sistema
- `atividades_usuario`: Rastreamento de atividades

### 6. db/index.ts

Conexão Drizzle ORM e funções auxiliares:

```typescript
import { db } from '@/lib/db';

// Usar funções auxiliares
const todosLivros = await obterTodosOsLivros();
const livro = await obterLivroPorId(1);
const usuario = await obterUsuarioPorEmail('email@example.com');
```

## Padrões de Uso

### Importar Tipos

```typescript
import {
  Livro,
  Software,
  Projeto,
  Usuario,
  TipoConteudo,
  NivelAcesso,
} from '@/lib';
```

### Usar Dados Centralizados

```typescript
import {
  livrosExemplo,
  softwaresExemplo,
  planosSubscricao,
  categoriasLivros,
} from '@/lib/dados';

// Em componentes
export default function Page() {
  return (
    <div>
      {categoriasLivros.map((cat) => (
        <a key={cat.href} href={cat.href}>
          {cat.titulo}
        </a>
      ))}
    </div>
  );
}
```

### Usar Utilitários

```typescript
import {
  filtrarLivrosPorCategoria,
  buscarLivros,
  formatarData,
  usuarioPodeAcessar,
  obterRecursosPopulares,
} from '@/lib/utilitarios';

// Filtrar
const livrosMat = filtrarLivrosPorCategoria(livrosExemplo, 'Matemática');

// Buscar
const resultados = buscarLivros(livrosExemplo, 'engenharia');

// Formatar
const dataFormatada = formatarData(new Date());

// Validar acesso
const podeAcessar = usuarioPodeAcessar(usuarioExemplo, livro);

// Obter populares
const populares = obterRecursosPopulares([...livros, ...softwares]);
```

### Usar Configurações

```typescript
import {
  configuracaoSistema,
  LIMITES_SISTEMA,
  CATEGORIAS_LIVROS,
  isProducao,
} from '@/lib/configuracao';

// Acessar configurações
console.log(configuracaoSistema.nomeApp); // "Star B"
console.log(configuracaoSistema.urlBase); // "http://localhost:3000"

// Usar limites
const maxUpload = LIMITES_SISTEMA.tamanhoMaximoUpload;

// Verificar ambiente
if (isProducao()) {
  // Código para produção
}
```

## Fluxo de Dados

### Para Livros/Softwares/Projetos

1. **Tipagem**: Definida em `tipos.ts` (ex: `Livro`)
2. **Dados Iniciais**: Em `dados.ts` (ex: `livrosExemplo`)
3. **Banco de Dados**: Schema em `db/schema.ts` (tabela `livros`)
4. **Acesso ao BD**: Funções em `db/index.ts`
5. **Manipulação**: Utilitários em `utilitarios.ts`
6. **Uso em Componentes**: Importar tipos e dados

### Exemplo Completo

```typescript
// 1. Importar tipo
import type { Livro } from '@/lib/tipos';

// 2. Importar dados
import { livrosExemplo } from '@/lib/dados';

// 3. Importar utilitários
import {
  filtrarLivrosPorCategoria,
  formatarData,
  obterRecursosPopulares,
} from '@/lib/utilitarios';

// 4. Usar tudo junto
export default function BibliotecaPage() {
  const livrosEngenharia = filtrarLivrosPorCategoria(
    livrosExemplo,
    'Engenharia'
  );

  const populares = obterRecursosPopulares(livrosEngenharia, 5);

  return (
    <div>
      {populares.map((livro: Livro) => (
        <article key={livro.id}>
          <h3>{livro.titulo}</h3>
          <p>{livro.descricao}</p>
          <time>{formatarData(livro.dataPublicacao)}</time>
        </article>
      ))}
    </div>
  );
}
```

## Adicionando Novos Dados

### Para Adicionar um Novo Livro

1. Adicione em `dados.ts`:

```typescript
{
  id: 'livro-003',
  titulo: 'Novo Livro',
  descricao: '...',
  autores: [...],
  // ... outros campos
}
```

2. Depois, insira no banco:

```typescript
import { db } from '@/lib/db';
import { livros } from '@/lib/db/schema';

await db.insert(livros).values({
  titulo: 'Novo Livro',
  // ... outros campos
});
```

## URLs do Cloudinary

### Estrutura de Pastas

```
starb/
├── livros/        # PDFs e EPUBs
├── capas/         # Imagens de capa (otimizadas)
├── softwares/     # Downloads de software
├── projetos/      # Arquivos de projeto
└── usuarios/      # Fotos de perfil
```

### Gerar URL Otimizada

```typescript
import { gerarURLCloudinary, obterURLCapaOtimizada } from '@/lib/utilitarios';

// URL customizada
const url = gerarURLCloudinary('starb/livros/controle-001', {
  largura: 800,
  altura: 1200,
  qualidade: 'high',
  formato: 'webp',
});

// URL de capa (pré-configurada)
const urlCapa = obterURLCapaOtimizada('starb/livros/controle-001');
```

## Segurança e Permissões

### Verificar Acesso de Usuário

```typescript
import { usuarioPodeAcessar, verificarPermissaoDownload } from '@/lib/utilitarios';

// Verificar acesso geral
if (!usuarioPodeAcessar(usuario, livro)) {
  // Mostrar mensagem de acesso restrito
}

// Verificar permissão de download
const permissao = verificarPermissaoDownload(livro, usuario);
if (!permissao.permitido) {
  console.error(permissao.motivo);
}
```

## Variáveis de Ambiente Necessárias

```env
# Banco de Dados
DATABASE_URL=postgresql://user:password@host:5432/starb

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret

# Sistema
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
SECRET_KEY=sua-chave-secreta
```

## Próximos Passos

1. ✅ Estrutura de tipos centralizada
2. ✅ Dados de exemplo
3. ✅ Schema do banco de dados
4. ⏳ Implementar endpoints API
5. ⏳ Criar páginas de lista e detalhe
6. ⏳ Implementar upload para Cloudinary
7. ⏳ Autenticação e autorização

## Suporte

Para dúvidas ou sugestões sobre a arquitetura de dados, consulte este documento ou entre em contato com a equipe de desenvolvimento.
