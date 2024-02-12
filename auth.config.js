export const authConfig = {
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname.startsWith("/admin")) return !!auth
      return true
    },
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        const result = await fetch(`${process.env.URL_API}/auth/check-email?email=${profile.email}`);
        return result.status === 200;
      }

      return true
    },
  },
  providers: [],
};