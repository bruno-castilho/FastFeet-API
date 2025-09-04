-- DropForeignKey
ALTER TABLE "public"."photosDeliveredPackage" DROP CONSTRAINT "photosDeliveredPackage_packageId_fkey";

-- AlterTable
ALTER TABLE "public"."photosDeliveredPackage" ALTER COLUMN "packageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."photosDeliveredPackage" ADD CONSTRAINT "photosDeliveredPackage_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "public"."packages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
