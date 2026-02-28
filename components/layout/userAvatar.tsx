"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  nome: string;
  avatarUrl?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: { container: "h-7 w-7",  text: "text-[10px]", img: 28  },
  md: { container: "h-9 w-9",  text: "text-xs",     img: 36  },
  lg: { container: "h-12 w-12",text: "text-sm",     img: 48  },
  xl: { container: "h-24 w-24",text: "text-2xl",    img: 96  },
};

// Gera cor de fundo deterministicamente a partir do nome
function gerarCorFundo(nome: string): string {
  const cores = [
    "from-violet-500 to-purple-700",
    "from-blue-500 to-indigo-700",
    "from-cyan-500 to-blue-700",
    "from-emerald-500 to-teal-700",
    "from-rose-500 to-pink-700",
    "from-amber-500 to-orange-700",
    "from-fuchsia-500 to-violet-700",
    "from-sky-500 to-cyan-700",
  ];
  let hash = 0;
  for (let i = 0; i < nome.length; i++) {
    hash = nome.charCodeAt(i) + ((hash << 5) - hash);
  }
  return cores[Math.abs(hash) % cores.length];
}

function getIniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/);
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

export function UserAvatar({ nome, avatarUrl, size = "md", className }: UserAvatarProps) {
  const { container, text, img } = sizeMap[size];
  const iniciais = getIniciais(nome || "U");
  const gradiente = gerarCorFundo(nome || "U");

  if (avatarUrl) {
    return (
      <div className={cn("relative overflow-hidden rounded-full shrink-0", container, className)}>
        <Image
          src={avatarUrl}
          alt={`Avatar de ${nome}`}
          width={img}
          height={img}
          className="object-cover w-full h-full"
          onError={(e) => {
            // Fallback se a imagem falhar
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
    );
  }

  return (
    <div
      aria-label={`Avatar de ${nome}`}
      role="img"
      className={cn(
        "relative rounded-full shrink-0 flex items-center justify-center",
        "bg-gradient-to-br font-bold text-white shadow-md select-none",
        gradiente,
        container,
        text,
        className
      )}
    >
      {iniciais}
    </div>
  );
}