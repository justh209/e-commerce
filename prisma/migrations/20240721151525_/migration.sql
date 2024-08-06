/*
  Warnings:

  - You are about to drop the `oder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `oderproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `oder` DROP FOREIGN KEY `oder_userId_fkey`;

-- DropForeignKey
ALTER TABLE `oderproduct` DROP FOREIGN KEY `oderProduct_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `oderproduct` DROP FOREIGN KEY `oderProduct_productId_fkey`;

-- DropTable
DROP TABLE `oder`;

-- DropTable
DROP TABLE `oderproduct`;

-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `totalPrice` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderProduct` (
    `orderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `productPrice` INTEGER NOT NULL,
    `productQuantity` INTEGER NOT NULL,

    PRIMARY KEY (`orderId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderProduct` ADD CONSTRAINT `orderProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderProduct` ADD CONSTRAINT `orderProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
