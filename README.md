# Biblioteca de Babel - Frontend

Hola! este el apartado del Front de  "Biblioteca de Babel", una aplicación web para la gestión de libros, autores y préstamos.

## Tecnologías utilizadas

- **HTML**
- **CSS**
- **Bootstrap**

## Descripción

El frontend está compuesto HTML estaticos que consumen una API REST para obtener, crear, editar y eliminar información sobre libros, autores y préstamos, un CRUD, se utiliza DOM para acceder al cuerpo del html.

### Páginas principales HTML

- **index**: Página de inicio, muestra lis libros cargados
- **books**: Lista de libros disponibles.
- **authors**: Muestra los autores registrados.
- **loans**: Gestión de préstamos.
- **book_details**: Detalles de un libro específicoa, ingresado atravez de `index`.

### Paginas Auxiliares que ayudan al CRUD de cada pagina, en formato HTML
Cada entidad cuenta con sus respectivas páginas para la gestión:
- **Books**: `create_books`, `edit_books`.
- **Authors**: `create_authors`, `edit_authors`.
- **Loans**: `create_loans`, `edit_loans`.

## Endpoints Consumidos

El frontend realiza peticiones a los siguientes endpoints de la API:

### Libros (/api/books)
- **GET** `/api/books`: Obtiene la lista de todos los libros.
- **POST** `/api/books`: Agrega un nuevo libro.
- **GET** `/api/books/:id`: Obtiene los detalles de un libro.
- **PATCH** `/api/books/:id`: Modifica un libro existente.
- **DELETE** `/api/books/:id`: Elimina un libro.

### Autores (/api/authors)
- **GET** `/api/authors`: Lista todos los autores.
- **POST** `/api/authors`: Agrega un nuevo autor.
- **GET** `/api/authors/:id`: Obtiene información de un autor.
- **PATCH** `/api/authors/:id`: Modifica un autor existente.
- **DELETE** `/api/authors/:id`: Elimina un autor.

### Préstamos (/api/loans)
- **GET** `/api/loans`: Lista todos los préstamos registrados.
- **POST** `/api/loans`: Registra un nuevo préstamo.
- **GET** `/api/loans/:id`: Detalles de un préstamo específico.
- **PATCH** `/api/loans/:id`: Actualiza información de un préstamo.
- **DELETE** `/api/loans/:id`: Elimina un registro de préstamo.

## Despliegue con GitHub Pages

Este apartado esta configurado con  **GitHub Pages** para desplegar con le herramienta de **GitHub Actions**. El workflow se encuentra en `.github/workflows/deploy.yml` y se activa al hacer un push a la rama `main`.

## Uso y Despliegue

- **Base de datos:** Se utilizó **Supabase**, vinculada a la cuenta `ArielRepo`.
- **Backend:** Desplegado con **Render**, utilizando el Dockerfile desarrollado en `./todo_backend`.
  - 🔗 (https://despligue-backend-12225.onrender.com)
- **Frontend:** Desplegado con **GitHub Actions** en GitHub Pages.
  - 🔗 (https://arielrepo.github.io/despligue-backend-12225/)

`
---
