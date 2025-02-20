INSERT INTO "Author" (name, nationality, born_date, biography, stock_books) VALUES
('Gabriel García Márquez', 'Colombiano', '06/03/1927', 'Escritor de realismo mágico.', 4),
('Isabel Allende', 'Chilena', '02/08/1942', 'Escritora de novelas históricas.', 4),
('J.K. Rowling', 'Británica', '31/07/1965', 'Autora de la saga Harry Potter.', 4),
('Stephen King', 'Estadounidense', '21/09/1947', 'Autor de terror y suspenso.', 4),
('Haruki Murakami', 'Japonés', '12/01/1949', 'Escritor contemporáneo y surrealista.', 4);

INSERT INTO "Book" (author_id, availability, stock, title, publication_date, genre, language) VALUES
(1, 'Disponible', 5, 'Cien Años de Soledad', '05/06/1967', 'Realismo Mágico', 'Español'),
(1, 'Disponible', 3, 'El Otoño del Patriarca', '15/09/1975', 'Realismo Mágico', 'Español'),
(1, 'Disponible', 4, 'El Amor en los Tiempos del Cólera', '10/11/1985', 'Romance', 'Español'),
(1, 'Disponible', 2, 'Crónica de una Muerte Anunciada', '20/04/1981', 'Novela', 'Español');

INSERT INTO "Book" (author_id, availability, stock, title, publication_date, genre, language) VALUES
(2, 'Disponible', 5, 'La Casa de los Espíritus', '01/01/1982', 'Novela', 'Español'),
(2, 'Disponible', 3, 'Eva Luna', '01/05/1987', 'Novela', 'Español'),
(2, 'Disponible', 4, 'Paula', '15/08/1994', 'Memorias', 'Español'),
(2, 'Disponible', 2, 'El Plan Infinito', '10/10/2009', 'Novela', 'Español');

INSERT INTO "Book" (author_id, availability, stock, title, publication_date, genre, language) VALUES
(3, 'Disponible', 10, 'Harry Potter y la Piedra Filosofal', '26/06/1997', 'Fantasía', 'Inglés'),
(3, 'Disponible', 8, 'Harry Potter y la Cámara Secreta', '02/07/1998', 'Fantasía', 'Inglés'),
(3, 'Disponible', 7, 'Harry Potter y el Prisionero de Azkaban', '08/07/1999', 'Fantasía', 'Inglés'),
(3, 'Disponible', 9, 'Harry Potter y el Cáliz de Fuego', '06/07/2000', 'Fantasía', 'Inglés');

INSERT INTO "Book" (author_id, availability, stock, title, publication_date, genre, language) VALUES
(4, 'Disponible', 6, 'It', '15/09/1986', 'Terror', 'Inglés'),
(4, 'Disponible', 4, 'Misery', '08/06/1987', 'Suspenso', 'Inglés'),
(4, 'Disponible', 5, 'El Resplandor', '28/01/1977', 'Terror', 'Inglés'),
(4, 'Disponible', 3, 'Carrie', '05/04/1974', 'Terror', 'Inglés');

INSERT INTO "Book" (author_id, availability, stock, title, publication_date, genre, language) VALUES
(5, 'Disponible', 4, 'Kafka en la orilla', '12/09/2002', 'Ficción', 'Japonés'),
(5, 'Disponible', 4, 'Norwegian Wood', '04/09/1987', 'Novela', 'Japonés'),
(5, 'Disponible', 5, '1Q84', '25/05/2009', 'Ficción', 'Japonés'),
(5, 'Disponible', 2, 'Sputnik Sweetheart', '01/11/1999', 'Novela', 'Japonés');

INSERT INTO "Loans" (book_id, price, reader, loan_date, return_date) VALUES
(1, 10.50, 'Juan Pérez', '01/03/2023', '15/03/2023'),
(7, 8.75, 'María López', '05/04/2023', '20/04/2023'),
(10, 12.00, 'Carlos Sánchez', '10/05/2023', '25/05/2023'),
(15, 9.50, 'Ana García', '15/06/2023', '30/06/2023'),
(19, 11.00, 'Luis Martínez', '20/07/2023', '04/08/2023');

