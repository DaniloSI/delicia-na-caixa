import { authConfig } from "@/../auth.config"
import NextAuth from "next-auth"

export const config = {
  matcher: ["/admin"],
}

export const { auth: middleware } = NextAuth(authConfig)
