/*
  Warnings:

  - You are about to drop the column `age` on the `USER` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `USER` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `USER` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `USER` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `USER` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "USER" DROP COLUMN "age",
DROP COLUMN "name",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "USER_username_key" ON "USER"("username");
