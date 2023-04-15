/*
  Warnings:

  - The primary key for the `Stocks` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "FrontAmount" DROP CONSTRAINT "FrontAmount_stockId_fkey";

-- DropForeignKey
ALTER TABLE "StockAmount" DROP CONSTRAINT "StockAmount_stockId_fkey";

-- DropForeignKey
ALTER TABLE "_StocksToTag" DROP CONSTRAINT "_StocksToTag_A_fkey";

-- AlterTable
ALTER TABLE "FrontAmount" ALTER COLUMN "stockId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "StockAmount" ALTER COLUMN "stockId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Stocks" DROP CONSTRAINT "Stocks_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Stocks_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Stocks_id_seq";

-- AlterTable
ALTER TABLE "_StocksToTag" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "FrontAmount" ADD CONSTRAINT "FrontAmount_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockAmount" ADD CONSTRAINT "StockAmount_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StocksToTag" ADD CONSTRAINT "_StocksToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Stocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
