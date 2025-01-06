/*
  Warnings:

  - Added the required column `color` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "color" "ColorsType" NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "size" "SizesType" NOT NULL;
