import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createAccount, getAccount } from "./data-service";

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const url = request.nextUrl;

      // Allow internal Next.js routes (favicon, assets)
      if (
        url.pathname.startsWith("/_next") ||
        url.pathname.startsWith("/favicon.ico")
      ) {
        return true;
      }

      // Block access if no authenticated user
      return !!auth?.user;
    },

    async signIn({ user }) {
      try {
        const existingAccount = await getAccount(user.email);
        if (!existingAccount) {
          const [firstName, lastName = ""] = user.name.split(" ");
          await createAccount({
            emailId: user.email,
            firstName,
            lastName,
          });
        }
        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },

    async session({ session }) {
      try {
        const account = await getAccount(session.user.email);
        session.user.accountId = account?.id || null;
        session.user.accountAvatar = account?.avatar || null;
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
