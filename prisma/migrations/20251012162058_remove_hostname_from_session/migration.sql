/*
  Warnings:

  - You are about to drop the column `hostname` on the `sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."sessions" DROP COLUMN "hostname";
