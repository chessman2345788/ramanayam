-- AlterTable
ALTER TABLE "product_variants" ADD COLUMN     "attributes" JSONB DEFAULT '{}',
ADD COLUMN     "needs_pricing" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "name_hi" TEXT,
ADD COLUMN     "variant_type" TEXT;
