/*
  Warnings:

  - You are about to drop the column `price` on the `Stocks` table. All the data in the column will be lost.
  - Added the required column `retailPrice` to the `Stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wholesalePrice` to the `Stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stocks" DROP COLUMN "price",
ADD COLUMN     "retailPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "wholesalePrice" DOUBLE PRECISION NOT NULL;
