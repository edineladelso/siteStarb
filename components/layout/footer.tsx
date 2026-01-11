import Image from "next/image";
import { Instagram, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="bg-black text-white
    flex justify-between max-w-full w-full
    py-4 m-auto px-30 font-spectral items-center
    "
    >
      <div className="max-w-sm">
        <Image
          src="/img/starbdarkFinal.webp"
          alt="Logo da Star B"
          width={130}
          height={50}
          className="rounded-xl bg-amber-50 p-1.5"
        />
        <p className="mt-2 font-spectral text-base">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
          voluptatibus ea vitae debitis eius reprehenderit dolor adipisci
        </p>
      </div>
      <ul className="flex gap-4 items-center">
        <li>
          <a href="#">
            <Instagram className="cursor-pointer hover:text-blue-400"/>
          </a>
        </li>
        <li>
          <a href="#">
            <Github className="cursor-pointer hover:text-blue-400"/>
          </a>
        </li>
        <li>
          <a href="#">
            <Mail className="cursor-pointer hover:text-blue-400"/>
          </a>
        </li>
      </ul>
    </footer>
  );
}
