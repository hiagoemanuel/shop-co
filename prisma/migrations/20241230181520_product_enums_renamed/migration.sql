/*
  Warnings:

  - The values [t_shirt] on the enum `ProductType` will be removed. If these variants are still used in the database, this will fail.
  - The values [xx_small,x_small,x_large,xx_large,xxx_large,xxxx_large] on the enum `SizesType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductType_new" AS ENUM ('tShirt', 'short', 'shirt', 'hoodie', 'jeans');
ALTER TABLE "product" ALTER COLUMN "type" TYPE "ProductType_new" USING ("type"::text::"ProductType_new");
ALTER TYPE "ProductType" RENAME TO "ProductType_old";
ALTER TYPE "ProductType_new" RENAME TO "ProductType";
DROP TYPE "ProductType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SizesType_new" AS ENUM ('xxSmall', 'xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge', 'xxxLarge', 'xxxxLarge');
ALTER TABLE "product" ALTER COLUMN "sizes" TYPE "SizesType_new"[] USING ("sizes"::text::"SizesType_new"[]);
ALTER TYPE "SizesType" RENAME TO "SizesType_old";
ALTER TYPE "SizesType_new" RENAME TO "SizesType";
DROP TYPE "SizesType_old";
COMMIT;
