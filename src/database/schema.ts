import {
    date,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

export const STATUS_ENUM = pgEnum('status_enum', [
    'pending',
    'approved',
    'rejected',
]);
export const ROLE_ENUM = pgEnum('role_enum', ['user', 'admin']);
export const BORROW_STATUS_ENUM = pgEnum('borrow_status_enum', [
    'borrowed',
    'returned',
]);

export const user = pgTable('user', {
    id: uuid('id').primaryKey().notNull().defaultRandom().unique(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    email: text('email').notNull(),
    universityId: integer('university_id').notNull().unique(),
    password: text('password').notNull(),
    universityCard: text('university_card').notNull(),
    status: STATUS_ENUM('status').notNull().default('pending'),
    role: ROLE_ENUM('role').notNull().default('user'),
    lastActivityDate: date('last_activity_date').notNull().defaultNow(),
    createAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
