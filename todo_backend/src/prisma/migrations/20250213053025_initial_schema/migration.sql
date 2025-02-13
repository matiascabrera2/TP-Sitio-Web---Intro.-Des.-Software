-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "born_date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "publication_date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Loans" ALTER COLUMN "loan_date" SET DATA TYPE TEXT,
ALTER COLUMN "return_date" SET DATA TYPE TEXT;
