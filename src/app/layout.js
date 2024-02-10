import { Inter } from "next/font/google";
import "./globals.css";
import { Flowbite } from "flowbite-react";

import { GoogleTagManager } from "@next/third-parties/google";

import StoreProvider from "../providers/store-provider";

import { getCentPrice, getOtherSettings, getSnacks } from "@/services/store";

import { ToastContainer } from "react-toastify";

import theme from "@/theme";

import Image from "next/image";
import Logo from "@/assets/logo.png";

import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Delícia na caixa - fazer pedido",
  description: "Fazer pedido de salgados para festas e eventos",
};

export const revalidate = 60 * 15;

export default async function RootLayout({ children }) {
  const snacksStore = await getSnacks();
  const centPriceStore = await getCentPrice();
  const otherSettingsStore = await getOtherSettings();

  const store = {
    snacksStore: snacksStore.map((snack) => ({
      ...snack,
      centPrice: centPriceStore.get(snack.type),
    })),
    centPriceStore,
    otherSettingsStore,
  };

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Flowbite theme={{ theme }}>
          <StoreProvider value={store}>
            <main className="flex flex-col justify-items-center gap-6 min-h-screen py-5 px-4 md:max-w-96 m-auto">
              <Image
                src={Logo}
                height={50}
                className="place-self-center"
                alt="Logo delícia na caixa"
                priority
              />
              {children}
            </main>
          </StoreProvider>
        </Flowbite>
        <ToastContainer theme="colored" />
      </body>
      <GoogleTagManager gtmId="G-ZYM0MPKM3D" />
    </html>
  );
}
