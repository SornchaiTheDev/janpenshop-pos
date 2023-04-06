/*
  Warnings:

  - You are about to drop the `_StocksToTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StocksToTags" DROP CONSTRAINT "_StocksToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_StocksToTags" DROP CONSTRAINT "_StocksToTags_B_fkey";

-- AlterTable
ALTER TABLE "Stocks" ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "tagsId" TEXT;

-- DropTable
DROP TABLE "_StocksToTags";

-- AddForeignKey
ALTER TABLE "Stocks" ADD CONSTRAINT "Stocks_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "Tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;
