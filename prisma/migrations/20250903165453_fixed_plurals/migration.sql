/*
  Warnings:

  - You are about to drop the `recipient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."packages" DROP CONSTRAINT "packages_recipientId_fkey";

-- DropTable
DROP TABLE "public"."recipient";

-- CreateTable
CREATE TABLE "public"."recipients" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "recipients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipients_email_key" ON "public"."recipients"("email");

-- AddForeignKey
ALTER TABLE "public"."packages" ADD CONSTRAINT "packages_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "public"."recipients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
