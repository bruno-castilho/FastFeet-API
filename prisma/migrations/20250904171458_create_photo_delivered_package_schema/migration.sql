-- CreateTable
CREATE TABLE "public"."photosDeliveredPackage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,

    CONSTRAINT "photosDeliveredPackage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."photosDeliveredPackage" ADD CONSTRAINT "photosDeliveredPackage_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "public"."packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
