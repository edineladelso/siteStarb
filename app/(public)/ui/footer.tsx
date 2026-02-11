import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-blue-100 bg-white/60 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-indigo-700">
                <span className="font-bold text-white">S</span>
              </div>
              <span className="bg-linear-to-r from-blue-700 to-indigo-700 bg-clip-text text-xl font-bold text-transparent">
                Star B
              </span>
            </div>
            <p className="px-4 text-sm text-slate-600">
              Plataforma de aprendizagem técnica para engenheiros e
              profissionais sérios.
            </p>
          </div>

          <div className="col-span-2 grid w-full shrink-0 grid-cols-2 space-y-8 space-x-28 px-3 sm:grid-cols-3">
            <div>
              <h4 className="mb-4 font-semibold text-slate-900">Conteúdo</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link
                    href="/biblioteca"
                    className="transition-colors hover:text-blue-700"
                  >
                    Biblioteca
                  </Link>
                </li>
                <li>
                  <Link
                    href="/softwares"
                    className="transition-colors hover:text-blue-700"
                  >
                    Softwares
                  </Link>
                </li>
                <li>
                  <Link
                    href="/artigos"
                    className="transition-colors hover:text-blue-700"
                  >
                    Artigos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ia"
                    className="transition-colors hover:text-blue-700"
                  >
                    IA & ML
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-slate-900">Premium</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link
                    href="/premium"
                    className="transition-colors hover:text-blue-700"
                  >
                    Planos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/premium/cursos"
                    className="transition-colors hover:text-blue-700"
                  >
                    Cursos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/premium/mentoria"
                    className="transition-colors hover:text-blue-700"
                  >
                    Mentoria
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-slate-900">Empresa</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link
                    href="/sobre"
                    className="transition-colors hover:text-blue-700"
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contato"
                    className="transition-colors hover:text-blue-700"
                  >
                    Contato
                  </Link>
                </li>
                <li>
                  <Link
                    href="/termos"
                    className="transition-colors hover:text-blue-700"
                  >
                    Termos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-blue-100 pt-8 text-center text-sm text-slate-600">
          <p>
            &copy; {new Date().getFullYear()} Star B. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
