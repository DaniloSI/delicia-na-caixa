import { Inter } from "next/font/google";
import "./globals.css";
import { Flowbite } from "flowbite-react";

import { GoogleTagManager } from "@next/third-parties/google";

import StoreProvider from "../providers/store-provider";

import { getCentPrice, getOtherSettings, getSnacks } from "@/services/store";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import theme from "@/theme";

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
          <StoreProvider value={store}>{children}</StoreProvider>
        </Flowbite>
        <ToastContainer theme="colored" />
      </body>
      <GoogleTagManager gtmId="G-ZYM0MPKM3D" />
    </html>
  );
}
