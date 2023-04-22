/*
  Warnings:

  - A unique constraint covering the columns `[billId]` on the table `History` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "History_billId_key" ON "History"("billId");
