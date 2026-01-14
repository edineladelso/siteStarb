// ============================================
// EXEMPLOS PRÁTICOS DE USO
// ============================================

// Arquivo: lib/data.ts
// Local: /home/edineladelso/starB/dev/NextJs/segundoNext/siteStarb/lib/data.ts

/**
 * ÍNDICE DE DADOS CENTRALIZADOS
 * 
 * Este arquivo contém todos os dados que eram anteriormente espalhados
 * nos componentes. Agora estão centralizados para fácil manutenção.
 */

// ============================================
// 1. NAVEGAÇÃO - Como Usar
// ============================================

import { booksCategories, softwareCategories } from "@/lib/data";

// Renderizar todas as categorias de livros
function MenuLivros() {
  return (
    <ul>
      {booksCategories.map((category) => (
        <li key={category.href}>
          <a href={category.href}>{category.title}</a>
          <p>{category.description}</p>
        </li>
      ))}
    </ul>
  );
}

// Buscar uma categoria específica
function findBookCategory(title: string) {
  return booksCategories.find((cat) => cat.title === title);
}

// Filtrar categorias que contém "Programação"
function filterProgramming() {
  return booksCategories.filter((cat) =>
    cat.title.toLowerCase().includes("programação")
  );
}

// ============================================
// 2. HOME PAGE - Como Usar
// ============================================

import { homeFeatures, premiumItems } from "@/lib/data";

// Renderizar features com badge
function FeaturesDisplay() {
  return (
    <section>
      {homeFeatures.map((feature) => (
        <article key={feature.href}>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
          {feature.badge && <span>{feature.badge}</span>}
        </article>
      ))}
    </section>
  );
}

// Obter apenas features com badge (premium)
function getPremiumFeatures() {
  return homeFeatures.filter((f) => f.badge);
}

// ============================================
// 3. SOBRE PAGE - Como Usar
// ============================================

import {
  libraryLinks,
  academicLinks,
  projectLinks,
  philosophyPrinciples,
} from "@/lib/data";

// Renderizar todos os links de biblioteca
function LibrarySection() {
  return (
    <div>
      <h2>Biblioteca</h2>
      {libraryLinks.map((link) => (
        <a key={link.href} href={link.href}>
          {link.title}
        </a>
      ))}
    </div>
  );
}

// Renderizar princípios filosóficos
function PhilosophyList() {
  return (
    <ul>
      {philosophyPrinciples.map((principle) => (
        <li key={principle}>{principle}</li>
      ))}
    </ul>
  );
}

// Agrupar todos os links por categoria
function getAllLinks() {
  return {
    biblioteca: libraryLinks,
    academico: academicLinks,
    projetos: projectLinks,
  };
}

// ============================================
// 4. OPERAÇÕES AVANÇADAS
// ============================================

// Buscar item por múltiplos campos
function searchItems(query: string) {
  const allCategories = [...booksCategories, ...softwareCategories];
  return allCategories.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
  );
}

// Contar items por categoria
function getStats() {
  return {
    totalBooks: booksCategories.length,
    totalSoftware: softwareCategories.length,
    totalFeatures: homeFeatures.length,
  };
}

// Transformar dados para outro formato
function categoriesToOptions() {
  return booksCategories.map((cat) => ({
    label: cat.title,
    value: cat.href,
  }));
}

// ============================================
// 5. ADICIONAR NOVOS DADOS
// ============================================

/**
 * Para adicionar um novo item:
 * 
 * 1. Abra lib/data.ts
 * 2. Localize o array apropriado (ex: booksCategories)
 * 3. Adicione o novo objeto:
 * 
 * {
 *   title: "Nova Categoria",
 *   href: "/livros/nova-categoria",
 *   description: "Descrição sobre a nova categoria"
 * }
 * 
 * 4. Salve o arquivo
 * 5. Todos os componentes que usam booksCategories
 *    automaticamente mostrarão o novo item!
 */

// Exemplo: Adicionar novo item programaticamente (para APIs)
function addBookCategory(newCategory: {
  title: string;
  href: string;
  description: string;
}) {
  // Em um cenário real, isso seria uma chamada a API
  // Por enquanto, apenas demonstrativo
  const updated = [...booksCategories, newCategory];
  return updated;
}

// ============================================
// 6. VALIDAÇÃO COM ZOD (Sugestão futura)
// ============================================

/**
 * Para adicionar validação, instale zod:
 * npm install zod
 * 
 * Então adicione em lib/data.ts:
 * 
 * import { z } from 'zod';
 * 
 * export const CategorySchema = z.object({
 *   title: z.string().min(1),
 *   href: z.string().url(),
 *   description: z.string().min(10),
 * });
 * 
 * export type Category = z.infer<typeof CategorySchema>;
 * 
 * // Validar dados
 * const validCategory = CategorySchema.parse(newData);
 */

// ============================================
// 7. HOOK CUSTOMIZADO (Sugestão futura)
// ============================================

/**
 * Crie um arquivo: hooks/useNavigation.ts
 * 
 * import {
 *   booksCategories,
 *   softwareCategories,
 *   homeFeatures,
 * } from "@/lib/data";
 * 
 * export function useNavigation() {
 *   return {
 *     books: booksCategories,
 *     software: softwareCategories,
 *     features: homeFeatures,
 *   };
 * }
 * 
 * // Usar em componentes:
 * const { books, software } = useNavigation();
 */

// ============================================
// 8. INTEGRAÇÃO COM API (Sugestão futura)
// ============================================

/**
 * Para integrar com backend:
 * 
 * // Em um arquivo services/api.ts
 * export async function fetchCategories() {
 *   const response = await fetch('/api/categories');
 *   return response.json();
 * }
 * 
 * export async function fetchFeatures() {
 *   const response = await fetch('/api/features');
 *   return response.json();
 * }
 * 
 * // Em componentes:
 * import { fetchCategories } from "@/services/api";
 * 
 * const [categories, setCategories] = useState([]);
 * 
 * useEffect(() => {
 *   fetchCategories().then(setCategories);
 * }, []);
 */

export {};
