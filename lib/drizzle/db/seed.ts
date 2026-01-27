import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../db/schema";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL!;

console.log("DB:", connectionString);

const client = postgres(connectionString, {max: 1});
const db = drizzle(client, { schema });

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Limpar tabelas
    await db.delete(schema.livros);
    await db.delete(schema.softwares);
    await db.delete(schema.projetos);
    await db.delete(schema.artigos);

    // Inserir livros
    await db.insert(schema.livros).values([
      {
        id: "livro-1",
        titulo: "Inteligência Artificial Aplicada",
        autor: "Dr. João Silva",
        categoria: "IA",
        descricao: "Guia completo sobre IA moderna com aplicações práticas",
        capaUrl: "https://via.placeholder.com/400x600/3b82f6/ffffff?text=IA+Aplicada",
        pdfUrl: "https://example.com/pdf1.pdf",
        status: "ativo",
        views: 2340,
        downloads: 1200,
        avaliacao: "4.8",
        tags: ["IA", "Machine Learning", "Python"],
        idioma: "Português",
        numeroPaginas: 450,
      },
      {
        id: "livro-2",
        titulo: "Machine Learning Avançado",
        autor: "Dra. Maria Santos",
        categoria: "IA",
        descricao: "Técnicas avançadas de ML e Deep Learning",
        capaUrl: "https://via.placeholder.com/400x600/8b5cf6/ffffff?text=ML+Avancado",
        pdfUrl: "https://example.com/pdf2.pdf",
        status: "ativo",
        views: 3120,
        downloads: 1890,
        avaliacao: "4.9",
        tags: ["ML", "Deep Learning", "TensorFlow"],
        idioma: "Português",
        numeroPaginas: 520,
      },
    ]);

    // Inserir softwares
    await db.insert(schema.softwares).values([
      {
        id: "software-1",
        titulo: "AutoCAD 2024",
        categoria: "Engenharia",
        descricao: "Software profissional de CAD para engenheiros",
        siteOficial: "https://autodesk.com",
        preco: "2.999,00MT",
        plataformas: ["Windows", "Mac"],
        status: "ativo",
        views: 5600,
        downloads: 3400,
        avaliacao: "4.9",
        funcionalidades: "Modelagem 2D/3D, Renderização, Colaboração",
        requisitos: "Windows 10+, 8GB RAM, GPU dedicada",
      },
      {
        id: "software-2",
        titulo: "MATLAB R2024",
        categoria: "Programação",
        descricao: "Ambiente de computação numérica",
        siteOficial: "https://mathworks.com",
        preco: "1.299,00MT",
        plataformas: ["Windows", "Mac", "Linux"],
        status: "ativo",
        views: 4200,
        downloads: 2100,
        avaliacao: "4.7",
        funcionalidades: "Computação numérica, Simulação, Visualização",
        requisitos: "8GB RAM, 20GB disco",
      },
    ]);

    // Inserir projetos
    await db.insert(schema.projetos).values([
      {
        id: "projeto-1",
        titulo: "Sistema IoT para Automação Residencial",
        autor: "João Silva",
        categoria: "IoT",
        descricao: "Sistema completo de automação residencial com IoT",
        problemaResolvido: "Controle e monitoramento remoto de dispositivos domésticos",
        tecnologias: "Arduino, ESP32, MQTT, Node.js, React",
        dificuldade: "Intermediário",
        duracao: "2 meses",
        status: "ativo",
        views: 890,
        downloads: 450,
        avaliacao: "4.6",
        repositorioGithub: "https://github.com/exemplo/iot-casa",
      },
    ]);

    // Inserir artigos
    await db.insert(schema.artigos).values([
      {
        id: "artigo-1",
        titulo: "Redes Neurais Convolucionais Aplicadas",
        autores: "Maria Santos, João Silva",
        categoria: "IA",
        descricao: "Estudo sobre CNNs em visão computacional",
        resumo: "Este trabalho apresenta uma análise detalhada sobre redes neurais convolucionais...",
        palavrasChave: "CNN, Deep Learning, Visão Computacional",
        anoPublicacao: 2024,
        instituicao: "Universidade Eduardo Mondlane",
        pdfUrl: "https://example.com/artigo1.pdf",
        status: "publicado",
        views: 1560,
        downloads: 890,
        avaliacao: "4.7",
      },
    ]);

    console.log("✅ Seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error;
  } finally {
    await client.end();
  }
}

seed();