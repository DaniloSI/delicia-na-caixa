import Image from "next/image";

import Logo from "@/assets/logo.png";

export default function LogoStore() {
  return (
    <Image
      src={Logo}
      height={40}
      className="my-4 place-self-center"
      alt="Logo delícia na caixa"
      priority
    />
  );
}
