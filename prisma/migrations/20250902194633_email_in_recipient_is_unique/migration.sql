/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `recipient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "recipient_email_key" ON "public"."recipient"("email");
