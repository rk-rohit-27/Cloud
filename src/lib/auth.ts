import NextAuth, { CredentialsSignin } from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { getMongoClient } from "@/lib/mongodb";

class EmailNotVerifiedError extends CredentialsSignin {
  code = "EmailNotVerified";
}

export const authConfig: NextAuthConfig = {
  trustHost: true,
  adapter: MongoDBAdapter(getMongoClient(), {
    databaseName: undefined, // uses default DB from URI
  }),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { MongoClient } = await import("mongodb");
        const client = await getMongoClient();
        await client.connect();
        const db = client.db();

        const user = await db.collection("users").findOne({
          email: credentials.email as string,
        });

        if (!user || !user.hashedPassword) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword as string,
        );

        if (!isValid) return null;

        // Block unverified email sign-ins
        if (!user.emailVerified) {
          throw new EmailNotVerifiedError();
        }

        return {
          id: user._id.toString(),
          name: user.name as string,
          email: user.email as string,
          image: user.image as string | null,
          emailVerified: user.emailVerified as Date | null,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.emailVerified = user.emailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as { id: string }).id = token.id as string;
      }
      if (session.user && token.emailVerified) {
        (session.user as any).emailVerified = token.emailVerified as Date | null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
