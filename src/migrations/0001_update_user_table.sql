ALTER TABLE "todo" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "todo_id_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "todo_university_id_unique";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_university_id_unique" UNIQUE("university_id");