import { type DefaultSession, type DefaultUser } from "next-auth";
import { type DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      emailVerified: Date | null;
    };
  }

  interface User extends DefaultUser {
    id: string;
    emailVerified: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    emailVerified: Date | null;
  }
}
