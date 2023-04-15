/*
  Warnings:

  - The primary key for the `Stocks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Stocks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `stockId` on the `FrontAmount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `stockId` on the `StockAmount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_StocksToTag` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "FrontAmount" DROP CONSTRAINT "FrontAmount_stockId_fkey";

-- DropForeignKey
ALTER TABLE "StockAmount" DROP CONSTRAINT "StockAmount_stockId_fkey";

-- DropForeignKey
ALTER TABLE "_StocksToTag" DROP CONSTRAINT "_StocksToTag_A_fkey";

-- AlterTable
ALTER TABLE "FrontAmount" DROP COLUMN "stockId",
ADD COLUMN     "stockId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StockAmount" DROP COLUMN "stockId",
ADD COLUMN     "stockId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Stocks" DROP CONSTRAINT "Stocks_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Stocks_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_StocksToTag" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FrontAmount_stockId_key" ON "FrontAmount"("stockId");

-- CreateIndex
CREATE UNIQUE INDEX "StockAmount_stockId_key" ON "StockAmount"("stockId");

-- CreateIndex
CREATE UNIQUE INDEX "_StocksToTag_AB_unique" ON "_StocksToTag"("A", "B");

-- AddForeignKey
ALTER TABLE "FrontAmount" ADD CONSTRAINT "FrontAmount_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockAmount" ADD CONSTRAINT "StockAmount_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StocksToTag" ADD CONSTRAINT "_StocksToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Stocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
