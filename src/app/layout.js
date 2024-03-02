import "react-day-picker/dist/style.css";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

import { IS_DEVELOPMENT } from "@/utils/constants";

import Loading from "./loading";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Delícia na caixa - fazer pedido",
  description: "Fazer pedido de salgados para festas e eventos",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="pt-BR" data-theme="light">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=1"
        />
      </head>
      <body className={inter.className}>
        <main className="flex flex-col justify-items-center min-h-screen md:max-w-96 m-auto">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
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
