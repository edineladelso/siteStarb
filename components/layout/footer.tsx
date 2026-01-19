import { Github, Instagram, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
      <footer className="mt-24 border-t border-blue-100 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  Star B
                </span>
              </div>
              <p className="text-sm px-4 text-slate-600">
                Plataforma de aprendizagem técnica para engenheiros e profissionais sérios.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 w-full space-y-8 space-x-28 px-3 shrink-0">
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Conteúdo</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li><Link href="/biblioteca" className="hover:text-blue-700 transition-colors">Biblioteca</Link></li>
                  <li><Link href="/softwares" className="hover:text-blue-700 transition-colors">Softwares</Link></li>
                  <li><Link href="/artigos" className="hover:text-blue-700 transition-colors">Artigos</Link></li>
                  <li><Link href="/ia" className="hover:text-blue-700 transition-colors">IA & ML</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Premium</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li><Link href="/premium" className="hover:text-blue-700 transition-colors">Planos</Link></li>
                  <li><Link href="/premium/cursos" className="hover:text-blue-700 transition-colors">Cursos</Link></li>
                  <li><Link href="/premium/mentoria" className="hover:text-blue-700 transition-colors">Mentoria</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Empresa</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li><Link href="/sobre" className="hover:text-blue-700 transition-colors">Sobre</Link></li>
                  <li><Link href="/contato" className="hover:text-blue-700 transition-colors">Contato</Link></li>
                  <li><Link href="/termos" className="hover:text-blue-700 transition-colors">Termos</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-blue-100 text-center text-sm text-slate-600">
            <p>&copy; {new Date().getFullYear()} Star B. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
  );
}
