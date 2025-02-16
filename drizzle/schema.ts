import {
  pgTable,
  timestamp,
  text,
  primaryKey,
  integer,
  uuid,
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"

export const userTable = pgTable("user", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: timestamp({ mode: "date" }),
  image: text(),
  username: text().notNull().unique(), // TODO: change on user username change
  githubInstallationId: integer(),
})

export const accountTable = pgTable(
  "account",
  {
    userId: uuid()
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    type: text().$type<AdapterAccountType>().notNull(),
    provider: text().notNull(),
    providerAccountId: text().notNull(),
    refresh_token: text(),
    access_token: text(),
    expires_at: integer(),
    token_type: text(),
    scope: text(),
    id_token: text(),
    session_state: text(),
  },
  (accountTable) => [
    primaryKey({
      columns: [accountTable.provider, accountTable.providerAccountId],
    }),
  ]
)
