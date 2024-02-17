import { Inter } from "next/font/google";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import StoreProvider from "../providers/store-provider";

import { getCentPrice, getOtherSettings, getSnacks } from "@/services/store";

import { ToastContainer } from "react-toastify";

import Image from "next/image";
import Logo from "@/assets/logo.png";

import "react-toastify/dist/ReactToastify.css";
import { IS_DEVELOPMENT } from "@/utils/constants";
import { capitalize } from "@/utils/format";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Delícia na caixa - fazer pedido",
  description: "Fazer pedido de salgados para festas e eventos",
};

export const revalidate = 60 * 15;

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  const [snacksStore, centPriceStore, otherSettingsStore] = await Promise.all([
    getSnacks(),
    getCentPrice(),
    getOtherSettings(),
  ]);

  const store = {
    snacksStore,
    centPriceStore,
    otherSettingsStore,
    activeSnacks: snacksStore
      .filter((snack) => snack.active)
      .map((snack) => ({
        ...snack,
        centPrice: centPriceStore[snack.type],
        unitWeightInGrams:
          otherSettingsStore[`unitWeightInGrams${capitalize(snack.type)}`],
      })),
  };

  return (
    <html lang="pt-BR" data-theme="light">
      <body className={inter.className}>
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
        <ToastContainer theme="colored" />
      </body>
      {!IS_DEVELOPMENT && (
        <>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        </>
      )}
    </html>
  );
}
