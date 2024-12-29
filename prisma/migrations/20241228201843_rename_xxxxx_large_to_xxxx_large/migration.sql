/*
  Warnings:

  - The values [xxxxx_large] on the enum `SizesType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SizesType_new" AS ENUM ('xx_small', 'x_small', 'small', 'medium', 'large', 'x_large', 'xx_large', 'xxx_large', 'xxxx_large');
ALTER TABLE "product" ALTER COLUMN "sizes" TYPE "SizesType_new"[] USING ("sizes"::text::"SizesType_new"[]);
ALTER TYPE "SizesType" RENAME TO "SizesType_old";
ALTER TYPE "SizesType_new" RENAME TO "SizesType";
DROP TYPE "SizesType_old";
COMMIT;
