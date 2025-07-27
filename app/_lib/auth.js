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
    authorized({ auth }) {
      return !!auth?.user?.email;
    },

    async signIn({ user }) {
      try {
        const existingAccount = await getAccount(user.email);

        const [firstName, lastName] = user.name?.split(" ") ?? ["", ""];

        if (!existingAccount) {
          await createAccount({
            emailId: user.email,
            firstName,
            lastName,
          });
        }

        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },

    async session({ session }) {
      if (!session?.user?.email) {
        console.warn("No session or session.user.email found");
        return session;
      }

      try {
        const account = await getAccount(session.user.email);
        if (account) {
          session.user.accountId = account.id ?? null;
          session.user.accountAvatar = account.avatar ?? null;
        } else {
          session.user.accountId = null;
          session.user.accountAvatar = null;
        }
      } catch (error) {
        console.error("Error during session callback:", error);
        session.user.accountId = null;
        session.user.accountAvatar = null;
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
