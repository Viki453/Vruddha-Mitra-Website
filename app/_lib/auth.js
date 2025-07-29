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
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL,
    secret: process.env.SUPABASE_KEY,
  }),
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const existingAccount = await getAccount(user.email);
        const firstName = user.name.split(" ").at(0);
        const lastName = user.name.split(" ").at(1);
        if (!existingAccount)
          await createAccount({
            emailId: user.email,
            firstName: firstName,
            lastName: lastName,
          });
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const account = await getAccount(session.user.email);
      session.user.accountId = account.id;
      session.user.accountAvatar = account.avatar;
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
