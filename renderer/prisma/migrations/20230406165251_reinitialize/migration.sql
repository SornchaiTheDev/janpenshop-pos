/*
  Warnings:

  - You are about to drop the column `tags` on the `Stocks` table. All the data in the column will be lost.
  - You are about to drop the column `tagsId` on the `Stocks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stocks" DROP CONSTRAINT "Stocks_tagsId_fkey";

-- AlterTable
ALTER TABLE "Stocks" DROP COLUMN "tags",
DROP COLUMN "tagsId";

-- CreateTable
CREATE TABLE "_StocksToTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StocksToTags_AB_unique" ON "_StocksToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_StocksToTags_B_index" ON "_StocksToTags"("B");

-- AddForeignKey
ALTER TABLE "_StocksToTags" ADD CONSTRAINT "_StocksToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Stocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StocksToTags" ADD CONSTRAINT "_StocksToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
