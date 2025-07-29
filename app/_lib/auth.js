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
    authorized({ auth, request }) {
      const url = request.nextUrl;

      // Allow internal assets and login route without auth
      if (
        url.pathname.startsWith("/_next") ||
        url.pathname.startsWith("/favicon.ico") ||
        url.pathname === "/login"
      ) {
        return true;
      }

      // Safely check if user is authenticated
      return !!auth?.user;
    },

    async signIn({ user }) {
      try {
        const existingAccount = await getAccount(user.email);
        const [firstName, lastName] = user.name.split(" ");
        if (!existingAccount) {
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

    async session({ session }) {
      try {
        const account = await getAccount(session.user.email);
        if (account) {
          session.user.accountId = account.id;
          session.user.accountAvatar = account.avatar;
        }
        return session;
      } catch (err) {
        console.error("session error:", err);
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
