import NextAuth from "next-auth";

import { authConfig } from "@/../auth.config";

export const config = {
  matcher: ["/admin"],
};

export const { auth: middleware } = NextAuth(authConfig);
