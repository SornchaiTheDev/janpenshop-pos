-- CreateTable
CREATE TABLE "HistoryItem" (
    "id" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HistoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HistoryToHistoryItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HistoryToHistoryItem_AB_unique" ON "_HistoryToHistoryItem"("A", "B");

-- CreateIndex
CREATE INDEX "_HistoryToHistoryItem_B_index" ON "_HistoryToHistoryItem"("B");

-- AddForeignKey
ALTER TABLE "_HistoryToHistoryItem" ADD CONSTRAINT "_HistoryToHistoryItem_A_fkey" FOREIGN KEY ("A") REFERENCES "History"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HistoryToHistoryItem" ADD CONSTRAINT "_HistoryToHistoryItem_B_fkey" FOREIGN KEY ("B") REFERENCES "HistoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
