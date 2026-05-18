/*
  Warnings:

  - You are about to drop the column `paid` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `invoice` table. All the data in the column will be lost.
  - Added the required column `amount` to the `invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueData` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoice` DROP COLUMN `paid`,
    DROP COLUMN `total`,
    ADD COLUMN `amount` INTEGER NOT NULL,
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `dueData` DATETIME(3) NOT NULL;
