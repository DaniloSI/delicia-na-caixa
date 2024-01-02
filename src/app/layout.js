import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Delícia na caixa - fazer pedido',
  description: 'Fazer pedido de salgados para festas e eventos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /></head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
