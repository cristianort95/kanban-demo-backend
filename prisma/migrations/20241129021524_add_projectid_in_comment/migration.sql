/*
  Warnings:

  - Added the required column `project_id` to the `COMMENT` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "COMMENT" ADD COLUMN     "project_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "COMMENT" ADD CONSTRAINT "COMMENT_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "PROJECT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
