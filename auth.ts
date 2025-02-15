import NextAuth, { type DefaultSession } from "next-auth"
import GitHub from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./drizzle/client"
import { userTable, accountTable } from "./drizzle/schema"

declare module "next-auth" {
  interface User {
    username?: string
  }

  interface Session {
    user: {
      username: string
    } & DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.SECRET,
  adapter: DrizzleAdapter(db, {
    usersTable: userTable,
    accountsTable: accountTable,
  }),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile: (profile) => ({
        id: profile.id.toString(),
        username: profile.login,
        name: profile.name || profile.login,
        email: profile.email,
        image: profile.avatar_url,
      }),
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
      }

      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.username = token.username as string

      return session
    },
  },
})
