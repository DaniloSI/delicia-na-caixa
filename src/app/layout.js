import { Inter } from "next/font/google";
import "./globals.css";
import { Flowbite } from "flowbite-react";

import { GoogleTagManager } from '@next/third-parties/google'

import StoreProvider from "./providers/store-provider";

import { getSnacks } from "@/services/snacks";

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Delícia na caixa - fazer pedido",
  description: "Fazer pedido de salgados para festas e eventos",
};

const theme = {
  button: {
    color: {
      primary:
        "text-white bg-red-700 enabled:hover:bg-red-800 focus:ring-red-400",
    },
  },
};

export const revalidate = 60 * 15;

export default async function RootLayout({ children }) {
  const snacks = (await getSnacks()).record

  const store = {
    snacks
  };

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Flowbite theme={{ theme }}>
          <StoreProvider value={store}>
          {children}
          </StoreProvider>
        </Flowbite>
        <ToastContainer theme="colored" />
      </body>
      <GoogleTagManager gtmId="G-ZYM0MPKM3D" />
    </html>
  );
}
