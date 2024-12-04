/*
  Warnings:

  - The primary key for the `USERS` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `USERS` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "COMMENT" DROP CONSTRAINT "COMMENT_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ROLE" DROP CONSTRAINT "ROLE_user_id_fkey";

-- DropForeignKey
ALTER TABLE "TASK" DROP CONSTRAINT "TASK_user_id_fkey";

-- AlterTable
ALTER TABLE "COMMENT" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ROLE" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TASK" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "USERS" DROP CONSTRAINT "USERS_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "USERS_pkey" PRIMARY KEY ("email");

-- AddForeignKey
ALTER TABLE "ROLE" ADD CONSTRAINT "ROLE_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TASK" ADD CONSTRAINT "TASK_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "COMMENT" ADD CONSTRAINT "COMMENT_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
