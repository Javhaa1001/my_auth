import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt", // "jwt" for stateless sessions
  },
  providers: [
    // Discord login
    // DiscordProvider(),

    // Credentials login (email/password)
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        if (typeof email !== "string" || typeof password !== "string") {
          throw new Error("Имэйл болон нууц үг шаардлагатай");
        }

        const user = await db.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("Hereglec oldsongv");
        }
        const isValid = await compare(password, user.password);
        if (!isValid) {
          throw new Error("Нууц үг буруу байна");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt ({ token, user }) {
      if (user) {
        token.role = ( user as any ).role;
      }
      return token;
    },

    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub as string,
          role: token.role as string, // 👈 энд role-г session-д дамжуулж байна
        },
      };
    },
  },
} satisfies NextAuthConfig;
