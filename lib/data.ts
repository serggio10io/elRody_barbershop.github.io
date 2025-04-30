import type { HairStyle } from "./types";

export const hairStyles: HairStyle[] = [
  {
    id: "fade",
    name: "Fade Clásico Tupido",
    description: "Degradado perfecto con transición suave de piel a cabello.",
    price: 300,
    image: "/images/fade.webp",
  },
  {
    id: "pompadour",
    name: "Fade medio",
    description:
      "Estilo elevado en la parte superior con lados cortos y elegantes.",
    price: 300,
    image: "/images/pompadour.webp",
  },
  {
    id: "taper",
    name: "Degradado Gradual",
    description: "Degradado que se une con la parte superior.",
    price: 300,
    image: "/images/taper.webp",
  },
  {
    id: "buzz",
    name: "High Fade",
    description: "Corte militar clásico, práctico y de bajo mantenimiento.",
    price: 300,
    image: "/images/buzz.webp",
  },
  {
    id: "textured",
    name: "Dominicano con diseño ",
    description:
      "Estilo moderno con textura y diseño en la parte lateral, se le agrego 100 a su valor por el diseño",
    price: 400,
    image: "/images/textured.webp",
  },
  {
    id: "afro",
    name: "Machimbrado",
    description: "Corte que realza la textura natural del cabello.",
    price: 300,
    image: "/images/afro.webp",
  },
  {
    id: "peinados",
    name: "Peinado Moderno",
    description:
      "Estilo texturizado con volumen y definición para un look actual.",
    price: 2500,
    image: "/images/peinados.webp",
  },
  {
    id: "barba",
    name: "Dibujos",
    description:
      "Dibujos que realzan el estilo, raya sencilla el costo aumenta a medida que se dificulta el diseño",
    price: 50,
    image: "/images/barba.webp",
  },
  {
    id: "cejas",
    name: "Diseño de Cejas",
    description:
      "Perfilado y arreglo de cejas para un look impecable y definido, el precio depende de si son virgenes o no con tinte ocsila entre los 350-400",
    price: 150,
    image: "/images/cejas.webp",
  },
  {
    id: "iluminacion",
    name: "Iluminacion masculina",
    description:
      "Iluminacion masculina para un look fresco y moderno, el precio puede llegar a los 2300",
    price: 1500,
    image: "/images/iluminaciones.webp",
  },
];
