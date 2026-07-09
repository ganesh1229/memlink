-- DropForeignKey
ALTER TABLE "ClickEvent" DROP CONSTRAINT "ClickEvent_linkId_fkey";

-- AlterTable
ALTER TABLE "ClickEvent" ADD COLUMN     "browser" TEXT,
ADD COLUMN     "device" TEXT,
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "os" TEXT;

-- AddForeignKey
ALTER TABLE "ClickEvent" ADD CONSTRAINT "ClickEvent_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
