/*
  Warnings:

  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StocksToTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StocksToTags" DROP CONSTRAINT "_StocksToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_StocksToTags" DROP CONSTRAINT "_StocksToTags_B_fkey";

-- DropTable
DROP TABLE "Tags";

-- DropTable
DROP TABLE "_StocksToTags";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StocksToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_StocksToTag_AB_unique" ON "_StocksToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_StocksToTag_B_index" ON "_StocksToTag"("B");

-- AddForeignKey
ALTER TABLE "_StocksToTag" ADD CONSTRAINT "_StocksToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Stocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StocksToTag" ADD CONSTRAINT "_StocksToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
