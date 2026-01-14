import Image from "next/image";
import { Instagram, Github, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="bg-black text-white
    flex flex-col md:flex-row justify-between max-w-full w-full
    py-6 md:py-4 m-auto px-6 sm:px-12 md:px-30 font-spectral items-center md:items-start gap-6 md:gap-0
    "
    >
      <div className="max-w-sm w-full md:w-auto">
      <Image
        src="/img/starbdarkFinal.webp"
        alt="Logo da Star B"
        width={130}
        height={50}
        className="rounded-xl bg-amber-50 p-1.5 w-28 md:w-32 h-auto"
      />
      <p className="mt-2 font-spectral text-sm md:text-sm">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
        voluptatibus ea vitae debitis eius reprehenderit dolor adipisci
      </p>
      </div>
      <ul className="flex gap-4 items-center">
      <li>
        <Link href="#">
        <Instagram className="cursor-pointer hover:text-blue-400 w-6 h-6 md:w-5 md:h-5"/>
        </Link>
      </li>
      <li>
        <Link href="#">
        <Github className="cursor-pointer hover:text-blue-400 w-6 h-6 md:w-5 md:h-5"/>
        </Link>
      </li>
      <li>
        <Link href="#">
        <Mail className="cursor-pointer hover:text-blue-400 w-6 h-6 md:w-5 md:h-5"/>
        </Link>
      </li>
      </ul>
    </footer>
  );
}
