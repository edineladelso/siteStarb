import { Github, Instagram, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="font-spectral m-auto flex w-full max-w-full flex-col items-center justify-between gap-6 bg-black px-6 py-6 text-white sm:px-12 md:flex-row md:items-start md:gap-0 md:px-30 md:py-4">
      <div className="w-full max-w-sm md:w-auto">
        <Image
          src="/img/starbdarkFinal.webp"
          alt="Logo da Star B"
          width={130}
          height={50}
          className="h-auto w-28 rounded-xl bg-amber-50 p-1.5 md:w-32"
        />
        <p className="font-spectral mt-2 text-sm md:text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
          voluptatibus ea vitae debitis eius reprehenderit dolor adipisci
        </p>
      </div>
      <ul className="flex items-center gap-4">
        <li>
          <Link href="#">
            <Instagram className="h-6 w-6 cursor-pointer hover:text-blue-400 md:h-5 md:w-5" />
          </Link>
        </li>
        <li>
          <Link href="#">
            <Github className="h-6 w-6 cursor-pointer hover:text-blue-400 md:h-5 md:w-5" />
          </Link>
        </li>
        <li>
          <Link href="#">
            <Mail className="h-6 w-6 cursor-pointer hover:text-blue-400 md:h-5 md:w-5" />
          </Link>
        </li>
      </ul>
    </footer>
  );
}
