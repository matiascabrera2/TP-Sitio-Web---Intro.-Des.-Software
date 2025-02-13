INSERT INTO Author (name, nacionality, born_date, biografity, stock_books)
VALUES 
('Gabriel García Márquez', 'Colombiana', '1927-03-06', 'Escritor colombiano, Premio Nobel de Literatura. Obras destacadas: Cien años de soledad, El amor en los tiempos del cólera.', 10),
('Isabel Allende', 'Chilena', '1942-08-02', 'Escritora chilena reconocida por novelas como La casa de los espíritus.', 5),
('J. K. Rowling', 'Británica', '1965-07-31', 'Autora de la saga de Harry Potter, una de las más vendidas en la historia.', 12),
('Mario Vargas Llosa', 'Peruana', '1936-03-28', 'Escritor peruano, Premio Nobel de Literatura, autor de La ciudad y los perros.', 8),
('Haruki Murakami', 'Japonesa', '1949-01-12', 'Novelista japonés contemporáneo, conocido por Tokio Blues y Kafka en la orilla.', 7);

INSERT INTO Books (availability, titulo, author_id, publication_date, genre, language, pages, loan_price)
VALUES
-- Gabriel García Márquez (author_id = 1)
('Disponible', 'Cien años de soledad', 1, '1967-05-30', 'Realismo mágico', 'Español', 496, 10.50),
('Disponible', 'El amor en los tiempos del cólera', 1, '1985-09-05', 'Realismo mágico', 'Español', 432, 9.99),
('Prestado', 'Crónica de una muerte anunciada', 1, '1981-03-01', 'Realismo mágico', 'Español', 160, 8.50),

-- Isabel Allende (author_id = 2)
('Disponible', 'La casa de los espíritus', 2, '1982-01-01', 'Ficción', 'Español', 433, 10.00),
('Disponible', 'Paula', 2, '1994-01-01', 'Autobiografía', 'Español', 368, 9.50),

-- J. K. Rowling (author_id = 3)
('Disponible', 'Harry Potter y la piedra filosofal', 3, '1997-06-26', 'Fantasía', 'Inglés', 309, 12.00),
('Disponible', 'Harry Potter y la cámara secreta', 3, '1998-07-02', 'Fantasía', 'Inglés', 341, 12.00),
('Prestado',   'Harry Potter y el prisionero de Azkaban', 3, '1999-07-08', 'Fantasía', 'Inglés', 317, 12.00),
('Disponible', 'Harry Potter y el cáliz de fuego', 3, '2000-07-08', 'Fantasía', 'Inglés', 636, 14.00),

-- Mario Vargas Llosa (author_id = 4)
('Disponible', 'La ciudad y los perros', 4, '1963-01-01', 'Ficción', 'Español', 351, 11.00),
('Disponible', 'La fiesta del chivo', 4, '2000-01-01', 'Ficción histórica', 'Español', 416, 11.50),
('Disponible', 'Travesuras de la niña mala', 4, '2006-01-01', 'Ficción', 'Español', 336, 10.75),

-- Haruki Murakami (author_id = 5)
('Prestado',   'Tokio Blues (Norwegian Wood)', 5, '1987-09-04', 'Ficción contemporánea', 'Japonés', 296, 10.00),
('Disponible', 'Kafka en la orilla', 5, '2002-09-12', 'Fantasía contemporánea', 'Japonés', 505, 11.25),
('Disponible', '1Q84 (Libro 1)', 5, '2009-05-29', 'Ficción distópica', 'Japonés', 550, 12.50);

INSERT INTO Loans (reader, book_id, loan_date, return_date, price)
VALUES
('Juan Pérez',  1, '2025-01-10', '2025-01-20', 10.50),  -- Cien años de soledad
('María Gómez', 3, '2025-01-15', '2025-01-25',  8.50),  -- Crónica de una muerte anunciada
('Luis Herrera', 8, '2025-02-01', '2025-02-15', 12.00), -- Harry Potter y el prisionero de Azkaban
('Ana Duarte',  13, '2025-02-05', '2025-02-25', 10.00), -- Tokio Blues (Norwegian Wood)
('Pedro López',  2, '2025-02-10', '2025-02-20',  9.99); -- El amor en los tiempos del cólera