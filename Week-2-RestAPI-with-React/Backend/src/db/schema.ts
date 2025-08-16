import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";

export const books = t.sqliteTable("books", {
  id: t.integer().primaryKey({
    autoIncrement: true,
  }),
  title: t.text().notNull(),
  author: t.text().notNull(),
  publishedAt: t.integer().notNull(),
});

export const orders = t.sqliteTable("orders", {
  id: t.integer().primaryKey({
    autoIncrement: true,
  }),
  menu: t.text().notNull(),
  quantity: t.integer().notNull(),
  price: t.integer().notNull(),
  status: t.text().notNull(),
  ordered_at: t.integer().notNull(),
});
