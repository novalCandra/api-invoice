/*
  Warnings:

  - You are about to drop the column `CreateAt` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `UpdateAt` on the `invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `invoice` DROP COLUMN `CreateAt`,
    DROP COLUMN `UpdateAt`;
