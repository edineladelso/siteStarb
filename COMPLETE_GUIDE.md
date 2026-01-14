# 📚 Guia Completo de Dados Centralizados

## 🎯 Objetivo
Centralizar todos os dados que estavam espalhados manualmente nos componentes em um único arquivo (`lib/data.ts`) para facilitar manutenção e reutilização.

---

## 📂 Estrutura de Arquivos

```
siteStarb/
├── lib/
│   └── data.ts                    ⭐ ARQUIVO CENTRAL (novo)
├── components/
│   └── layout/
│       └── navbarMenu.tsx         ✅ Refatorado
├── app/
│   └── (marketing)/
│       ├── page.tsx               ✅ Refatorado
│       └── sobre/
│           └── page.tsx           ✅ Refatorado
├── DATA_REFACTORING_SUMMARY.md    📄 Sumário executivo
├── REFACTORING_NOTES.md           📄 Notas técnicas
└── EXAMPLES_HOW_TO_USE.ts         📄 Exemplos de uso
```

---

## 🗂️ O que está em `lib/data.ts`

### Seção 1: Navegação e Menu
```typescript
// 📌 Categorias de Livros (7 items)
export const booksCategories: MenuItem[]

// 📌 Categorias de Software (9 items)
export const softwareCategories: MenuItem[]

// 📌 Menu Home (3 items)
export const homeMenuItems: NavItem[]

// 📌 Menu Rápido (4 items)
export const quickMenuItems: NavItem[]

// 📌 Links de Documentação (5 items)
export const documentationLinks: DocLink[]

// 📌 Opções de Tema (2 options)
export const themeOptions: ThemeOption[]
```

### Seção 2: Página Home
```typescript
// 📌 Features Principais (4 items)
export const homeFeatures: Feature[]

// 📌 Conteúdo Premium (3 items)
export const premiumItems: PremiumItem[]
```

### Seção 3: Página Sobre
```typescript
// 📌 Links da Biblioteca (3 items)
export const libraryLinks: ResourceLink[]

// 📌 Links Acadêmicos (3 items)
export const academicLinks: ResourceLink[]

// 📌 Links de Projetos (4 items)
export const projectLinks: ResourceLink[]

// 📌 Princípios Filosóficos (3 items)
export const philosophyPrinciples: string[]
```

---

## 🔗 Mapa de Uso

### ⚙️ navbarMenu.tsx
```
lib/data.ts
├── booksCategories    → Menu Livros {.map()}
├── softwareCategories → Menu Softwares {.map()}
├── homeMenuItems      → Menu Home {.map()}
├── quickMenuItems     → Menu Rápido {.map()}
├── documentationLinks → Menu Docs {.map()}
└── themeOptions       → Menu Tema {.map()}
```

### 🏠 page.tsx (Home)
```
lib/data.ts
├── homeFeatures  → Seção Features {.map()}
└── premiumItems  → Seção Premium {.map()}
```

### 📖 sobre/page.tsx
```
lib/data.ts
├── libraryLinks        → Seção Biblioteca {.map()}
├── academicLinks       → Seção Acadêmica {.map()}
├── projectLinks        → Seção Projetos {.map()}
└── philosophyPrinciples → Seção Filosofia {.map()}
```

---

## 💡 Exemplos de Uso

### 1. Renderizar Lista Completa
```tsx
import { booksCategories } from "@/lib/data";

export function BooksList() {
  return (
    <ul>
      {booksCategories.map((book) => (
        <li key={book.href}>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
        </li>
      ))}
    </ul>
  );
}
```

### 2. Buscar Um Item
```tsx
import { booksCategories } from "@/lib/data";

const matematica = booksCategories.find(
  (cat) => cat.title === "Matematica"
);
```

### 3. Filtrar Items
```tsx
import { homeFeatures } from "@/lib/data";

const premiumFeatures = homeFeatures.filter(
  (f) => f.badge !== undefined
);
```

### 4. Contar Items
```tsx
const totalCategories = booksCategories.length; // 7

const stats = {
  books: booksCategories.length,
  software: softwareCategories.length,
  features: homeFeatures.length,
};
```

### 5. Transformar Dados
```tsx
const bookOptions = booksCategories.map((book) => ({
  label: book.title,
  value: book.href,
}));
```

---

## ✨ Vantagens da Centralização

| Aspecto | Antes ❌ | Depois ✅ |
|---------|---------|---------|
| **Localização de dados** | 4 arquivos | 1 arquivo (`lib/data.ts`) |
| **Adicionar novo item** | Modificar componente | Adicionar à array em `lib/data.ts` |
| **Reutilizar dados** | Copiar/colar | Importar e usar |
| **Manutenção** | Procurar em vários lugares | Tudo em um lugar |
| **Type Safety** | Parcial | Completo com TypeScript |
| **Duplicação** | Possível | Impossível |

---

## 🚀 Como Adicionar Novo Dado

### Cenário: Adicionar novo livro
```tsx
// Abra: lib/data.ts
// Localize: booksCategories

export const booksCategories: MenuItem[] = [
  // ... items existentes ...
  
  // ➕ NOVO ITEM:
  {
    title: "Química",
    href: "/livros/quimica",
    description: "Livros e materiais sobre diversos ramos da química.",
  },
];
```

**Resultado:** Automaticamente aparece em:
- ✅ Menu de Livros (navbarMenu.tsx)
- ✅ Qualquer componente que renderize `booksCategories`

---

## 🔄 Fluxo de Dados

```
lib/data.ts (Fonte Única da Verdade)
         ↓
    ┌────┼────┐
    ↓    ↓    ↓
  nav  home sobre
  
Quando você modifica em lib/data.ts:
→ Todas as páginas recebem os dados atualizados
→ Sem replicação de mudanças
→ Um único ponto de verdade
```

---

## 📋 Checklist de Implementação

- ✅ Arquivo `lib/data.ts` criado
- ✅ Todas as interfaces TypeScript definidas
- ✅ navbarMenu.tsx refatorado
- ✅ page.tsx refatorado
- ✅ sobre/page.tsx refatorado
- ✅ Sem erros de compilação
- ✅ Dados reutilizáveis com `map()`, `find()`, `filter()`

---

## 🎓 Próximos Passos (Opcional)

### 1. Criar Hook Customizado
```tsx
// hooks/useNavigation.ts
export function useNavigation() {
  return {
    books: booksCategories,
    software: softwareCategories,
    features: homeFeatures,
  };
}

// Uso: const { books } = useNavigation();
```

### 2. Integrar com API
```tsx
// Substituir dados hardcoded por dados da API
const [categories, setCategories] = useState([]);

useEffect(() => {
  fetch('/api/categories')
    .then(res => res.json())
    .then(setCategories);
}, []);
```

### 3. Adicionar Busca Global
```tsx
function searchAll(query: string) {
  return [
    ...booksCategories,
    ...softwareCategories,
    ...homeFeatures,
  ].filter(item =>
    item.title.toLowerCase().includes(query)
  );
}
```

---

## 📞 Suporte

Se precisar adicionar mais dados:
1. Abra `lib/data.ts`
2. Localize a seção apropriada
3. Adicione à array correspondente
4. Pronto! Todos os componentes usam os dados atualizados

---

## 📊 Estatísticas

**Total de dados centralizados:**
- 📌 19+ constantes de dados
- 📌 7+ interfaces TypeScript
- 📌 50+ items em arrays
- 📌 200 linhas de código bem organizado

**Componentes refatorados:**
- navbarMenu.tsx (6 menus, todos dinâmicos)
- page.tsx (2 seções, ambas dinâmicas)
- sobre/page.tsx (4 seções, todas dinâmicas)

---

✨ **Refatoração concluída com sucesso!**
