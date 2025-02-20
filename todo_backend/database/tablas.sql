-- Crear tabla Author
CREATE TABLE "Author" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  nationality VARCHAR(255) NOT NULL,
  born_date VARCHAR(20) NOT NULL,       -- Fecha en formato dd/mm/aaaa
  biography TEXT NOT NULL,
  stock_books INTEGER NOT NULL
);

-- Crear tabla Book
CREATE TABLE "Book" (
  id SERIAL PRIMARY KEY,
  author_id INTEGER NOT NULL,
  availability VARCHAR(50) NOT NULL,
  stock INTEGER DEFAULT 0,
  title VARCHAR(255) NOT NULL,
  publication_date VARCHAR(20) NOT NULL,  -- Fecha en formato dd/mm/aaaa
  genre VARCHAR(100) NOT NULL,
  language VARCHAR(100) NOT NULL,
  CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES "Author"(id)
);

-- Crear tabla Loans
CREATE TABLE "Loans" (
  id SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  reader VARCHAR(255) NOT NULL,
  loan_date VARCHAR(20) NOT NULL,         -- Fecha en formato dd/mm/aaaa
  return_date VARCHAR(20) NOT NULL,         -- Fecha en formato dd/mm/aaaa
  CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES "Book"(id)
);
