import Image from "next/image";
import { Instagram, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="bg-accent-foreground text-white
    flex justify-between max-w-full w-full
    py-6 m-auto px-30
    "
    >
      <div className="max-w-sm">
        <Image
          src="/img/logowhite.png"
          alt="Logo da Star B"
          width={100}
          height={80}
        />
        <p className="mt-2 text-sm font-extralight">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
          voluptatibus ea vitae debitis eius reprehenderit dolor adipisci
        </p>
      </div>
      <div className="flex gap-4 ">
        <Instagram className="cursor-pointer hover:text-blue-400"/>
        <Github className="cursor-pointer hover:text-blue-400"/>
        <Mail className="cursor-pointer hover:text-blue-400"/>
      </div>
    </footer>
  );
}
