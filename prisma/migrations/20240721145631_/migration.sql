-- CreateTable
CREATE TABLE `oder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `totalPrice` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `oderProduct` (
    `orderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `productPrice` INTEGER NOT NULL,
    `productQuantity` INTEGER NOT NULL,

    PRIMARY KEY (`orderId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `oder` ADD CONSTRAINT `oder_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `oderProduct` ADD CONSTRAINT `oderProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `oderProduct` ADD CONSTRAINT `oderProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `oder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
