-- AlterTable
ALTER TABLE `activity_log` MODIFY `event_name` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `client_name` VARCHAR(191) NULL,
    MODIFY `amount` DECIMAL(65, 30) NULL,
    MODIFY `details` JSON NULL,
    MODIFY `event_date` DATETIME(3) NULL,
    MODIFY `event_time` DATETIME(3) NULL;
