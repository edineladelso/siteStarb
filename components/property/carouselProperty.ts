import imgCivil2 from "@/public/image/civil2.webp";
import edinelRobotics from "@/public/image/edinelrobot.png";
import engenharia from "@/public/image/Engenharia.webp";
import imgMeca1 from "@/public/image/meca1.webp";
import imgMeca2 from "@/public/image/meca2.png";
import imgMeca3 from "@/public/image/meca3.webp";
import imgMeca5 from "@/public/image/meca5.webp";
import imgAi from "@/public/img/IA.webp";
import imglivros from "@/public/img/imglivros.webp";
import imgMecatronica from "@/public/img/mecatronica.webp";
import type { StaticImageData } from "next/image";

export type ImgType = {
  value: string;
  src: StaticImageData;
  alt: string;
};
const imgCarousel: ImgType[] = [
  {
    value: "edinelRobotics",
    src: edinelRobotics,
    alt: "Imagem frontal de Edinel operando robô",
  },
  {
    value: "imgMeca1",
    src: imgMeca1,
    alt: "Imagem lateral de Edinel operando robô",
  },
  {
    value: "imgMeca2",
    src: imgMeca2,
    alt: "Imagem lateral de Edinel operando robô",
  },
  {
    value: "imgMeca3",
    src: imgMeca3,
    alt: "Imagem lateral de Edinel operando robô",
  },
    {
    value: "imgMeca5",
    src: imgMeca5,
    alt: "Imagem lateral de Edinel operando robô",
  },
  {
    value: "engenharia",
    src: engenharia,
    alt: "Imagem de engenharia de projetos",
  },
  {
    value: "imgAi",
    src: imgAi,
    alt: "IA e modelos de inteligencia Artificial",
  },
  {
    value: "imglivros",
    src: imglivros,
    alt: "Imagem de Livros",
  },
  {
    value: "imgCivil2",
    src: imgCivil2,
    alt: "Imagem de Livros",
  },
];

export default imgCarousel;
