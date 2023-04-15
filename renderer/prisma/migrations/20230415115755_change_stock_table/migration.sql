/*
  Warnings:

  - The primary key for the `Stocks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Stocks` table. All the data in the column will be lost.
  - You are about to drop the `FrontAmount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StockAmount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FrontAmount" DROP CONSTRAINT "FrontAmount_stockId_fkey";

-- DropForeignKey
ALTER TABLE "StockAmount" DROP CONSTRAINT "StockAmount_stockId_fkey";

-- DropForeignKey
ALTER TABLE "_StocksToTag" DROP CONSTRAINT "_StocksToTag_A_fkey";

-- AlterTable
ALTER TABLE "Stocks" DROP CONSTRAINT "Stocks_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Stocks_pkey" PRIMARY KEY ("barcode");

-- DropTable
DROP TABLE "FrontAmount";

-- DropTable
DROP TABLE "StockAmount";

-- AddForeignKey
ALTER TABLE "_StocksToTag" ADD CONSTRAINT "_StocksToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Stocks"("barcode") ON DELETE CASCADE ON UPDATE CASCADE;
