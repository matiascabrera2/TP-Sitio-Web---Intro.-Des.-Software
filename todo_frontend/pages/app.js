document.addEventListener("DOMContentLoaded", function() {
    const booksContainer = document.getElementById("books-container");

    // Realizar la petición HTTP para obtener los libros
    fetch("http://localhost:5000/api/books")
        .then(response => response.json())
        .then(data => {
            // Limpiar el contenedor de libros
            booksContainer.innerHTML = "";

            // Recorrer los libros y generar las cartas
            data.forEach(book => {
                const bookCard = `
                    <div class="col">
                        <div class="card h-100">
                            <a href="libro.html?title=${encodeURIComponent(book.title)}" class="text-decoration-none">
                                <img src="${book.image || 'images/library.png'}" class="card-img-top" alt="${book.title}">
                                <div class="card-body">
                                    <h5 class="card-title" style="color:black">${book.title}</h5>
                                    <p class="card-text ${book.available ? 'text-success' : 'text-danger'}">
                                        ${book.available ? 'Disponible' : 'En Préstamo'}
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                `;
                booksContainer.innerHTML += bookCard;
            });
        })
        .catch(error => {
            console.error("Error al cargar los libros:", error);
            booksContainer.innerHTML = "<p>Error al cargar los libros. Inténtalo de nuevo más tarde.</p>";
        });
});