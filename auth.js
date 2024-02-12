import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { createStorage } from "unstorage";
import { UnstorageAdapter } from "@auth/unstorage-adapter";
import redisDriver from "unstorage/drivers/redis";
import { IS_DEVELOPMENT, ONE_DAY_IN_MILLISECONDS } from "@/utils/constants";
import { authConfig } from './auth.config';

const storage = createStorage({
  driver: redisDriver({
    base: "unstorage",
    url: process.env.URL_REDIS,
    ttl: ONE_DAY_IN_MILLISECONDS,
  }),
});

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt", },
  secret: process.env.AUTH_SECRET,
  debug: IS_DEVELOPMENT,
  adapter: UnstorageAdapter(storage),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials) {
        return credentials;
      },
    }),
  ],
});
