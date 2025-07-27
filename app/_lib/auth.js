import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createAccount, getAccount } from "./data-service";

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // Used by middleware to authorize
    authorized({ auth }) {
      if (!auth || !auth.user || !auth.user.email) {
        console.warn("Unauthorized access: session missing or invalid");
        return false;
      }
      return true;
    },

    // Called on sign-in
    async signIn({ user }) {
      if (!user || !user.email) {
        console.error("signIn callback: user or email is null");
        return false;
      }

      try {
        const acct = await getAccount(user.email);
        const nameParts = user.name?.split(" ") ?? [];
        const firstName = nameParts[0] ?? "";
        const lastName = nameParts[1] ?? "";

        if (!acct) {
          await createAccount({
            emailId: user.email,
            firstName,
            lastName,
          });
        }
        return true;
      } catch (err) {
        console.error("signIn error:", err);
        return false;
      }
    },

    // Called on session retrieval
    async session({ session }) {
      if (!session || !session.user || !session.user.email) {
        console.warn("session callback: invalid session or missing email");
        return session;
      }
      try {
        const acct = await getAccount(session.user.email);
        session.user.accountId = acct?.id ?? null;
        session.user.accountAvatar = acct?.avatar ?? null;
      } catch (err) {
        console.error("session callback error:", err);
        session.user.accountId = session.user.accountId ?? null;
        session.user.accountAvatar = session.user.accountAvatar ?? null;
      }
      return session;
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
