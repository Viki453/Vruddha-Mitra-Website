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
  trustHost: true,

  callbacks: {
    authorized({ auth }) {
      // Defensive check to avoid null errors
      return !!auth?.user?.email;
    },

    async signIn({ user }) {
      try {
        const existingAccount = await getAccount(user.email);
        const [firstName, lastName = ""] = user.name.split(" ");
        if (!existingAccount) {
          await createAccount({
            emailId: user.email,
            firstName,
            lastName,
          });
        }
        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },

    async session({ session }) {
      try {
        const account = await getAccount(session.user.email);
        if (account) {
          session.user.accountId = account.id;
          session.user.accountAvatar = account.avatar;
        }
      } catch (error) {
        console.error("Session error:", error);
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
