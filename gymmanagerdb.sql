CREATE TABLE "instructors" (
  "id" SERIAL PRIMARY KEY,
  "avatar_url" text,
  "name" text NOT NULL,
  "birth" timestamp NOT NULL,
  "gender" text NOT NULL,
  "services" text NOT NULL,
  "monthly_fee" integer NOT NULL,
  "created_at" timestamp
);

CREATE TABLE "members" (
  "id" SERIAL PRIMARY KEY,
  "avatar_url" text,
  "name" text NOT NULL,
  "email" text,
  "birth" timestamp NOT NULL,
  "gender" text NOT NULL,
  "blood_type" text,
  "weight" integer NOT NULL,
  "height" integer NOT NULL,
  "instructor_id" integer NOT NULL
  "created_at" timestamp NOT NULL
);

ALTER TABLE "members" ADD FOREIGN KEY ("instructor_id") REFERENCES "instructors" ("id");
