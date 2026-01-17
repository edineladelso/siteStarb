# 🚀 QUICK REFERENCE - Centralização de Dados

## Imports Rápidos

```typescript
// Tudo em um lugar
import {
  // ===== TIPOS =====
  type Livro,
  type Software,
  type Projeto,
  type Usuario,
  type Autor,
  type PlanSubscricao,
  TipoConteudo,
  NivelAcesso,
  StatusPublicacao,
  
  // ===== DADOS =====
  livrosExemplo,
  softwaresExemplo,
  projetosExemplo,
  usuarioExemplo,
  planosSubscricao,
  categoriasLivros,
  menuPrincipal,
  
  // ===== FUNÇÕES =====
  filtrarLivrosPorCategoria,
  buscarLivros,
  formatarData,
  formatarPreco,
  usuarioPodeAcessar,
  verificarPermissaoDownload,
  obterRecursosPopulares,
  extrairTagsUnicas,
  
  // ===== CONFIG =====
  CATEGORIAS_LIVROS,
  LIMITES_SISTEMA,
  ROTAS,
  configuracaoSistema,
} from '@/lib';
```

## Padrões Comuns

### 1️⃣ Filtrar Livros por Categoria
```typescript
const livrosFisica = filtrarLivrosPorCategoria(
  livrosExemplo,
  'Física'
);
```

### 2️⃣ Buscar em Livros
```typescript
const resultados = buscarLivros(livrosExemplo, 'engenharia');
```

### 3️⃣ Formatar Data
```typescript
const data = formatarData(new Date()); // "01/01/2024"
const dataCompleta = formatarDataCompleta(new Date()); 
// "1 de janeiro de 2024, 10:30"
```

### 4️⃣ Verificar Acesso do Usuário
```typescript
import { usuarioPodeAcessar, usuarioExemplo, livrosExemplo } from '@/lib';

if (usuarioPodeAcessar(usuarioExemplo, livrosExemplo[0])) {
  // Usuário pode acessar este livro
}
```

### 5️⃣ Verificar Permissão de Download
```typescript
import { verificarPermissaoDownload } from '@/lib';

const permissao = verificarPermissaoDownload(
  livro, 
  usuario
);

if (!permissao.permitido) {
  console.error(permissao.motivo);
}
```

### 6️⃣ Obter Recursos Populares
```typescript
import { obterRecursosPopulares } from '@/lib';

const top5 = obterRecursosPopulares(livrosExemplo, 5);
```

### 7️⃣ Extrair Tags Únicas
```typescript
import { extrairTagsUnicas } from '@/lib';

const todasAsTags = extrairTagsUnicas(livrosExemplo);
// ['engenharia', 'python', 'controle', ...]
```

### 8️⃣ Obter Autor Principal
```typescript
import { obterAutorPrincipal } from '@/lib';

const autor = obterAutorPrincipal(livro);
// "Dr. João Silva"
```

### 9️⃣ Gerar URL Cloudinary Otimizada
```typescript
import { obterURLCapaOtimizada } from '@/lib';

const urlCapa = obterURLCapaOtimizada(
  'starb/livros/controle-001',
  400,  // largura
  600   // altura
);
```

### 🔟 Verificar Acesso a IA
```typescript
import { usuarioPodeAcessarIA } from '@/lib';

if (usuarioPodeAcessarIA(usuarioExemplo)) {
  // Mostrar conteúdo de IA
}
```

## Tipos Principais

### Livro
```typescript
interface Livro {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'pago' | 'livre';
  permissaoDownload: { permitido: boolean; mensagemPublicador?: string };
  estatisticas: { views: number; downloads: number; avaliacaoMedia: number };
  eNovo: boolean;
  popularidade: number;
  autores: Credito[];
  urls: { capa?: URL; pdf?: URL; epub?: URL; resumoIA?: string };
  // ... mais campos
}
```

### Usuario
```typescript
interface Usuario {
  id: string;
  email: string;
  nomeCompleto: string;
  nivelAcesso: 'visitante' | 'usuario_basico' | 'usuario_premium' | 'moderador' | 'administrador';
  subscricao: { plano: PlanSubscricao; ativa: boolean };
  preferences: { tema: 'claro' | 'escuro'; idioma: string };
  atividade: { livrosLidos: string[]; downloads: [] };
  // ... mais campos
}
```

### Software
```typescript
interface Software {
  id: string;
  nome: string;
  descricao: string;
  tipo: 'pago' | 'livre';
  versao: string;
  licenca: string;
  urlOficial: string;
  especificacoes: { sO: string[]; memoryMinima: string };
  // ... mais campos
}
```

### Projeto
```typescript
interface Projeto {
  id: string;
  titulo: string;
  categoria: 'pesquisa' | 'tcc' | 'dissertacao' | 'real_documentado' | 'ia';
  etapas: EtapaProjeto[];
  tecnologias: Tecnologia[];
  repositorio?: string;
  urlDemo?: string;
  // ... mais campos
}
```

## Constantes Úteis

```typescript
import { 
  CATEGORIAS_LIVROS,
  CATEGORIAS_SOFTWARE,
  CATEGOR IAS_PROJETO,
  IDIOMAS_SUPORTADOS,
  LICENCAS_SOFTWARE,
  LIMITES_SISTEMA,
  ROTAS,
  MENSAGENS_SISTEMA,
} from '@/lib';

// Usar em select/loop
CATEGORIAS_LIVROS.forEach(cat => {
  console.log(cat); // "Matemática", "Física", ...
});

// Validar tamanho de upload
const arquivo = new File([], 'test.pdf');
if (arquivo.size > LIMITES_SISTEMA.tamanhoMaximoUpload) {
  console.error(MENSAGENS_SISTEMA.erro.arquivoMuitoGrande);
}

// Navegar
window.location.href = ROTAS.biblioteca;
```

## Dados de Exemplo

```typescript
import {
  livrosExemplo,        // Livro[]
  softwaresExemplo,     // Software[]
  projetosExemplo,      // Projeto[]
  usuarioExemplo,       // Usuario
  planosSubscricao,     // PlanSubscricao[]
  categoriasLivros,     // ItemMenu[]
  menuPrincipal,        // ItemNavegacao[]
  recursosHome,         // Recurso[]
  itenssPremium,        // Recurso[]
} from '@/lib';

// Usar imediatamente em componentes
<div>
  {livrosExemplo.map(livro => (
    <h3 key={livro.id}>{livro.titulo}</h3>
  ))}
</div>
```

## Queries ao BD (Drizzle)

```typescript
import { 
  db,
  obterTodosOsLivros,
  obterLivroPorId,
  obterTodoSoftware,
  obterUsuarioPorEmail,
} from '@/lib/db';

// Usar em Server Components ou API Routes
const livros = await obterTodosOsLivros();
const livro = await obterLivroPorId(1);
const user = await obterUsuarioPorEmail('user@example.com');

// Ou usar Drizzle diretamente
import { livros, usuarios } from '@/lib/db/schema';
const resultado = await db.select().from(livros);
```

## Enums Úteis

```typescript
import {
  TipoConteudo,
  NivelAcesso,
  StatusPublicacao,
  TipoMidia,
} from '@/lib';

// Usar em comparações
if (livro.tipo === TipoConteudo.PAGO) {
  // É pago
}

// Ou em selects
<select>
  <option value={TipoConteudo.PAGO}>Pago</option>
  <option value={TipoConteudo.LIVRE}>Livre</option>
</select>

// Ou em loops
Object.values(NivelAcesso).forEach(nivel => {
  console.log(nivel);
  // VISITANTE, USUARIO_BASICO, USUARIO_PREMIUM, ...
});
```

## Exemplo Completo em Componente

```typescript
'use client';

import { useState, useMemo } from 'react';
import {
  livrosExemplo,
  usuarioExemplo,
  filtrarLivrosPorCategoria,
  buscarLivros,
  usuarioPodeAcessar,
  formatarData,
  obterAutorPrincipal,
} from '@/lib';

export default function Biblioteca() {
  const [categoria, setCategoria] = useState('');
  const [termo, setTermo] = useState('');

  // Filtrar
  const livrosFiltrados = useMemo(() => {
    let resultado = livrosExemplo;
    
    if (categoria) {
      resultado = filtrarLivrosPorCategoria(resultado, categoria);
    }
    
    if (termo) {
      resultado = buscarLivros(resultado, termo);
    }
    
    return resultado;
  }, [categoria, termo]);

  return (
    <div>
      <input
        placeholder="Buscar..."
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
      />

      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option value="">Todas</option>
        <option value="Engenharia">Engenharia</option>
        <option value="Programação">Programação</option>
      </select>

      {livrosFiltrados.map((livro) => (
        <article key={livro.id}>
          <h3>{livro.titulo}</h3>
          <p>Autor: {obterAutorPrincipal(livro)}</p>
          <p>Publicado: {formatarData(livro.dataPublicacao)}</p>
          
          {usuarioPodeAcessar(usuarioExemplo, livro) ? (
            <button>Acessar</button>
          ) : (
            <p>❌ Acesso restrito</p>
          )}
        </article>
      ))}
    </div>
  );
}
```

## Variáveis de Ambiente Necessárias

```env
# .env.local
DATABASE_URL=postgresql://user:password@localhost:5432/starb
NEXT_PUBLIC_CLOUDINARY_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
SECRET_KEY=sua-chave-secreta
NODE_ENV=development
```

## Links Úteis

- 📖 [DOCUMENTACAO_ARQUITETURA.md](./DOCUMENTACAO_ARQUITETURA.md) - Guia técnico completo
- 📋 [IMPLEMENTACAO_COMPLETA.md](./IMPLEMENTACAO_COMPLETA.md) - Sumário executivo
- 💻 [components/exemplos/BibliotecaExemplo.tsx](./components/exemplos/BibliotecaExemplo.tsx) - Componente funcional
- 📁 [lib/](./lib/) - Estrutura centralizada

## Dicas de Performance

```typescript
// ✅ Use useMemo para filtros complexos
const livrosFiltrados = useMemo(() => {
  return filtrarLivrosPorCategoria(livrosExemplo, categoria);
}, [categoria]);

// ✅ Use objetos tipados para queries
import type { Livro } from '@/lib';
const livro: Livro = livrosExemplo[0];

// ✅ Use índices do BD
// schema.ts tem índices em: categoria, tipo, email, isbn

// ✅ Limpar limites de resultado
const resultados = buscarLivros(livrosExemplo, termo);
const pagina1 = resultados.slice(0, LIMITES_SISTEMA.itensPorPagina);
```

---

**Tudo centralizado. Tudo tipado. Tudo documentado. 🚀**
