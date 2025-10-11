CREATE TYPE "public"."borrow_status_enum" AS ENUM('borrowed', 'returned');--> statement-breakpoint
CREATE TYPE "public"."role_enum" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."status_enum" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "todo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"university_id" integer NOT NULL,
	"password" text NOT NULL,
	"university_card" text NOT NULL,
	"status" "status_enum" DEFAULT 'pending' NOT NULL,
	"role" "role_enum" DEFAULT 'user' NOT NULL,
	"last_activity_date" date DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "todo_id_unique" UNIQUE("id"),
	CONSTRAINT "todo_university_id_unique" UNIQUE("university_id")
);
