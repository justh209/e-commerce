/*
  Warnings:

  - You are about to alter the column `totalPrice` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `totalPrice` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `price` INTEGER NOT NULL;
