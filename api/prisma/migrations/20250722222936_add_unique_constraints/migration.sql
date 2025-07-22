/*
  Warnings:

  - A unique constraint covering the columns `[ispb]` on the table `banks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `banks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `banks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "banks_ispb_key" ON "banks"("ispb");

-- CreateIndex
CREATE UNIQUE INDEX "banks_name_key" ON "banks"("name");

-- CreateIndex
CREATE UNIQUE INDEX "banks_code_key" ON "banks"("code");
