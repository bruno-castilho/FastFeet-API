-- CreateEnum
CREATE TYPE "public"."PackageState" AS ENUM ('CREATED', 'PENDING', 'PICKEDUP', 'DELIVERED', 'RETURNED');

-- CreateTable
CREATE TABLE "public"."packages" (
    "id" TEXT NOT NULL,
    "heightInCentimeters" INTEGER NOT NULL,
    "widthInCentimeters" INTEGER NOT NULL,
    "weightInGrams" INTEGER NOT NULL,
    "state" "public"."PackageState" NOT NULL DEFAULT 'CREATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postedAt" TIMESTAMP(3),
    "pickedUpAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "returnedAt" TIMESTAMP(3),
    "recipientId" TEXT NOT NULL,
    "deliveredBy" TEXT,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."packages" ADD CONSTRAINT "packages_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "public"."recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."packages" ADD CONSTRAINT "packages_deliveredBy_fkey" FOREIGN KEY ("deliveredBy") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
