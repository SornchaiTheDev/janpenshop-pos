/*
  Warnings:

  - You are about to drop the column `cost` on the `Stocks` table. All the data in the column will be lost.
  - You are about to drop the column `retailPrice` on the `Stocks` table. All the data in the column will be lost.
  - You are about to drop the column `wholesalePrice` on the `Stocks` table. All the data in the column will be lost.
  - Added the required column `price` to the `Stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stocks" DROP COLUMN "cost",
DROP COLUMN "retailPrice",
DROP COLUMN "wholesalePrice",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
