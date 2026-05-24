/*
  Warnings:

  - Added the required column `userId` to the `user_preferences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_preferences` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `user_preferences` ADD CONSTRAINT `user_preferences_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
