import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';

export const students = t.pgTable('students', {
    id: t.bigserial({ mode: 'number' }).primaryKey(),
    firstname: t.varchar({ length: 30 }).notNull(),
    lastname: t.varchar({ length: 30 }).notNull(),
    student_id: t.varchar({ length: 10 }).notNull().unique(),
    birthday: t.varchar({ length: 50 }),
    gender: t.varchar({ length: 10 }).notNull(),
});