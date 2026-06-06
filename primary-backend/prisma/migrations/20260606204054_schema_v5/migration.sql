/*
  Warnings:

  - You are about to drop the column `triggerId` on the `Zap` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Zap_triggerId_key";

-- AlterTable
ALTER TABLE "Zap" DROP COLUMN "triggerId";
