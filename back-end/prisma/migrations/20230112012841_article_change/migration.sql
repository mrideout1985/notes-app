/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `Article` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Article_description_key" ON "Article"("description");
