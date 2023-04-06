-- CreateTable
CREATE TABLE "Stocks" (
    "id" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "retailPrice" DOUBLE PRECISION NOT NULL,
    "wholesalePrice" DOUBLE PRECISION NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FrontAmount" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "stockId" TEXT NOT NULL,

    CONSTRAINT "FrontAmount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockAmount" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "stockId" TEXT NOT NULL,

    CONSTRAINT "StockAmount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stocks_barcode_key" ON "Stocks"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "FrontAmount_stockId_key" ON "FrontAmount"("stockId");

-- CreateIndex
CREATE UNIQUE INDEX "StockAmount_stockId_key" ON "StockAmount"("stockId");

-- AddForeignKey
ALTER TABLE "FrontAmount" ADD CONSTRAINT "FrontAmount_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockAmount" ADD CONSTRAINT "StockAmount_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
