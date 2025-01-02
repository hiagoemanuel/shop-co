/*
  Warnings:

  - The values [gray] on the enum `ColorsType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ColorsType_new" AS ENUM ('beige', 'black', 'blue', 'brown', 'cyan', 'grey', 'green', 'orange', 'purple', 'red', 'white', 'yellow');
ALTER TABLE "product" ALTER COLUMN "colors" TYPE "ColorsType_new"[] USING ("colors"::text::"ColorsType_new"[]);
ALTER TYPE "ColorsType" RENAME TO "ColorsType_old";
ALTER TYPE "ColorsType_new" RENAME TO "ColorsType";
DROP TYPE "ColorsType_old";
COMMIT;
