-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "born_date" TIMESTAMP(3) NOT NULL,
    "biography" TEXT NOT NULL,
    "stock_books" INTEGER NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "availability" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "publication_date" TIMESTAMP(3) NOT NULL,
    "genre" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "loan_price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loans" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "reader" TEXT NOT NULL,
    "loan_date" TIMESTAMP(3) NOT NULL,
    "return_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Loans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loans" ADD CONSTRAINT "Loans_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
