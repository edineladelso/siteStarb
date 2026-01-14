# Refatoração de Dados Centralizados

## Resumo das Mudanças

Todos os dados que estavam espalhados manualmente nos componentes foram centralizados em um único arquivo: [lib/data.ts](lib/data.ts)

### Estrutura de Dados Centralizada

#### 🧭 Navegação e Menu
- **`booksCategories`** - Categorias de livros (Matemática, Física, Engenharia, etc)
- **`softwareCategories`** - Categorias de software
- **`homeMenuItems`** - Itens do menu Home
- **`quickMenuItems`** - Menu rápido (Livros, Softwares, Artigos, Cursos)
- **`documentationLinks`** - Links de documentação externa
- **`themeOptions`** - Opções de tema (Light, Dark)

#### 🏠 Página Home
- **`homeFeatures`** - Características principais (Livros, Softwares, Artigos, IA)
- **`premiumItems`** - Conteúdo premium

#### 📖 Página Sobre
- **`libraryLinks`** - Links da biblioteca
- **`academicLinks`** - Links acadêmicos (TCC, Dissertações, Artigos)
- **`projectLinks`** - Links de projetos
- **`philosophyPrinciples`** - Princípios filosóficos

---

## Benefícios da Refatoração

✅ **Fácil Manutenção**: Alterar dados em um único lugar afeta toda a aplicação  
✅ **DRY (Don't Repeat Yourself)**: Sem duplicação de dados  
✅ **Type Safety**: Interfaces TypeScript bem definidas  
✅ **Escalabilidade**: Pronto para integração com APIs  
✅ **Reutilização**: Os dados podem ser usados em múltiplos componentes com `map()` e `find()`

---

## Componentes Refatorados

### ✅ [components/layout/navbarMenu.tsx](components/layout/navbarMenu.tsx)
- Importa dados de navegação do `lib/data.ts`
- Usa `.map()` para renderizar categorias dinâmicas
- Estrutura limpa e sem dados hardcoded

### ✅ [app/(marketing)/page.tsx](app/(marketing)/page.tsx)
- Importa features e premium content
- Usa `.map()` para renderizar cartões de features

### ✅ [app/(marketing)/sobre/page.tsx](app/(marketing)/sobre/page.tsx)
- Importa todos os links e princípios
- Usa `.map()` para renderizar listas dinâmicas

---

## Como Usar os Dados

### Exemplo com `map()`
```tsx
{booksCategories.map((book) => (
  <MenuItem key={book.title} item={book} />
))}
```

### Exemplo com `find()`
```tsx
const searchCategory = (title: string) => {
  return booksCategories.find(cat => cat.title === title);
}
```

### Exemplo com `filter()`
```tsx
const engineeringBooks = homeFeatures.filter(f => 
  f.title.includes("Engenharia")
);
```

---

## Próximas Melhorias (Sugestões)

💡 Integrar com API para dados dinâmicos  
💡 Criar hook customizado `useNavigation()` para usar dados  
💡 Adicionar validação Zod para dados  
💡 Criar service para buscar e filtrar dados
