import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createAccount, getAccount } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const existingAccount = await getAccount(user.email);
        const firstName = user.name?.split(" ")?.[0] || "";
        const lastName = user.name?.split(" ")?.[1] || "";
        if (!existingAccount)
          await createAccount({
            emailId: user.email,
            firstName,
            lastName,
          });
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      try {
        const account = await getAccount(session.user.email);
        session.user.accountId = account?.id || null;
        session.user.accountAvatar = account?.avatar || null;
      } catch (err) {
        console.error("Session callback error:", err);
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
