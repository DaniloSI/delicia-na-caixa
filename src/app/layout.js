import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Flowbite } from 'flowbite-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Delícia na caixa - fazer pedido',
  description: 'Fazer pedido de salgados para festas e eventos',
}

const theme = {
  button: {
    color: {
      primary: 'text-white bg-red-700 enabled:hover:bg-red-800 focus:ring-red-400',
    }
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /></head>
      <body className={inter.className}>
        <Flowbite theme={{ theme }}>
          {children}
        </Flowbite>
        <Toaster position="bottom-center" />
      </body>
    </html>
  )
}
