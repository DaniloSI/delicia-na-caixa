import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Flowbite } from "flowbite-react";

import { GoogleTagManager } from '@next/third-parties/google'

import snacksMock from '@/__mocks__/snacks'
import { useMemo } from "react";
import StoreProvider from "./providers/store-provider";

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

export default function RootLayout({ children }) {
  const store = useMemo(() => ({
    snacks: snacksMock,
  }), []);

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Flowbite theme={{ theme }}>
          <StoreProvider value={store}>
          {children}
          </StoreProvider>
        </Flowbite>
        <Toaster position="bottom-center" />
      </body>
      <GoogleTagManager gtmId="G-ZYM0MPKM3D" />
    </html>
  );
}
