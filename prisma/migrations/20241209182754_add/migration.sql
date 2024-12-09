/*
  Warnings:

  - You are about to drop the column `end_date` on the `TASK` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TASK" DROP COLUMN "end_date",
ADD COLUMN     "endDate" TIMESTAMP;
