import Image from "next/image";

import Logo from "@/assets/logo.png";

export default function LogoStore() {
  return (
    <Image
      src={Logo}
      height={40}
      className="place-self-center my-4"
      alt="Logo delícia na caixa"
      priority
    />
  );
}
