-- CreateTable
CREATE TABLE `invoice_customizations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoiceId` INTEGER NOT NULL,
    `background_color` VARCHAR(191) NOT NULL,
    `text_color` VARCHAR(191) NOT NULL,
    `accent_color` VARCHAR(191) NOT NULL,
    `custom_colors` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `invoice_customizations` ADD CONSTRAINT `invoice_customizations_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `invoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
