CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'DELIVERY_MAN');--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "user_role" DEFAULT 'DELIVERY_MAN' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
