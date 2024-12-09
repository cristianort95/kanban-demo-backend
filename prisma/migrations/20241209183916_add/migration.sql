/*
  Warnings:

  - You are about to drop the column `endDate` on the `TASK` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TASK" DROP COLUMN "endDate",
ADD COLUMN     "end_date" TIMESTAMP;
