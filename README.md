# Base de Datos de La Biblioteca de Babel

## Introducción
Esta es la BDD de "La Biblioteca de Babel", la cual permite gestionar libros, autores y préstamos. 
La base de datos almacena la información de cada entidad y sus relaciones, la base para realizar un CRUD en otras palabras.

## Tecnologías Utilizadas
- **Base de Datos:** PostgreSQL 
- **ORM:** Prisma 
- **Lenguaje:** SQL

## Modelo de Datos de PISMA, aunque es similar a la de SQL

### Tabla: Author

**Descripción:**  
Representa a los autores de los libros. Cada autor cuenta con información básica, como nombre, nacionalidad, fecha de nacimiento, biografía y el stock de libros que tiene. Además, cada autor puede tener varios libros asociados.

**Campos:**

- **id:** `Int`  
  Clave primaria, con autoincremento.

- **name:** `String`  
  Nombre del autor.

- **nationality:** `String`  
  Nacionalidad del autor.

- **born_date:** `String`  
  Fecha de nacimiento del autor (almacenada como cadena).  
  > *Nota: Aunque el campo es de tipo `String`, podría formatearse o validarse en la aplicación.*

- **biography:** `String`  
  Biografía del autor.

- **stock_books:** `Int`  
  Número de libros en stock del autor.

- **books:** `Book[]`  
  Relación de uno a muchos con la tabla **Book** (representa todos los libros asociados al autor).

---

### Tabla: Book

**Descripción:**  
Representa los libros de la biblioteca. Cada libro está vinculado a un autor y contiene información relevante como disponibilidad, stock, título, fecha de publicación, género, idioma y precio de préstamo. Además, cada libro puede estar relacionado con múltiples préstamos.

**Campos:**

- **id:** `Int`  
  Clave primaria, con autoincremento.

- **author_id:** `Int`  
  Llave foranea que referencia al `id` de la tabla **Author**.

- **availability:** `String`  
  Indica la disponibilidad del libro (por ejemplo, "Disponible" o "No disponible").

- **stock:** `Int`  
  Número de ejemplares disponibles (por defecto 0).

- **title:** `String`  
  Título del libro.

- **publication_date:** `String`  
  Fecha de publicación del libro (almacenada como cadena).

- **genre:** `String`  
  Género del libro.

- **language:** `String`  
  Idioma del libro.

- **loan_price:** `Decimal`  
  Precio del préstamo del libro.

- **loans:** `Loans[]`  
  Relación de uno a muchos con la tabla **Loans** (representa los préstamos asociados a este libro).
---

### Tabla: Loans

**Descripción:**  
Registra los préstamos de libros. Cada registro indica un préstamo de un libro, incluyendo el precio, el lector, la fecha del préstamo y la fecha de devolución.

**Campos:**

- **id:** `Int`  
  Clave primaria, con autoincremento.

- **book_id:** `Int`  
  Llave foránea que referencia al `id` de la tabla **Book**.

- **price:** `Decimal`  
  Precio del préstamo.

- **reader:** `String`  
  Nombre del lector que realizó el préstamo.

- **loan_date:** `String`  
  Fecha en la que se realizó el préstamo.

- **return_date:** `String`  
  Fecha en la que se espera la devolución del libro.

### Los campos que sean fechas, estan puestas con un tipo de dato string, ya que con Prisma y PostgreSQL solo se permite el formato cadena que concatena la fecha y la hora, en total 14 dígitos, lo cual no nos sirve.

###  Para el caso de `**loans:** `Loans[]` ` y `**books:** `Book[]` `, es en una implementacion a desarrollar, se puede utilizar esto para hacer un buscador de libros por autor, de esta manera, se puede utilizar esta propiedad, ya que no facilitaria al acceso por medio de prisma a la dicha propiamente dicha antes, `buscador de libros por autor`
