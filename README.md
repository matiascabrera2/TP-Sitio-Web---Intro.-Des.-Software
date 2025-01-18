# Backend del Proyecto: Mi biblioteca virtual

Este proyecto implementa un sistema de gestión de libros, autores y préstamos a través de una API REST. El backend proporciona operaciones CRUD completas para gestionar estas entidades y facilita la comunicación con el frontend.
Se divide en tres páginas principales: `NOMBRE 1.html`, `NOMBRE 2.html` y `NOMBRE 3.html`. Cada una tiene una función específica dentro del flujo del sistema.
El backend está construido en **JavaScript** utilizando el servicio de **Nodemon** para ejecutar el código fuera del navegador. Sirve como intermediario entre el frontend y la base de datos, gestionando solicitudes y respuestas. Todo el entorno se ejecuta dentro de un contenedor Docker, simplificando el proceso de instalación y despliegue.

## Tecnologías utilizadas

- **Frontend:** HTML, CSS, JavaScript.
- **Backend:** Node.js con Nodemon.
- **Framework:** Express.js
- **ORM:** Prisma
- **Base de datos:** PostgreSQL --- pgadmin4
- **Contenedor:** Docker para la configuración y despliegue del entorno.
- **API Testing y Documentación:** Postman

## Cómo cumple los requisitos:  --- REVISAR SI SE DEJA O NO
- Libro: (id, título, portada, año_publicación, género, etc.)
- Autor: (id, nombre, nacionalidad, fecha_nacimiento, bio, etc.)
- Préstamo: (id, libro_id, fecha_prestamo, fecha_devolucion, lector, estado)
- Préstamo tiene un foreign key a Libro.

### API REST Backend:
- Rutas: /api/libros, /api/autores, /api/prestamos. CRUD completo sobre libros, autores y préstamos.

### Frontend (3 páginas):
- Página 1 (Catálogo): Muestra los libros con portada, título, autor.
- Página 2 (Detalles del Libro): Despliega información completa del libro, su autor, y permite solicitar un préstamo.
- Página 3 (Administración): Añadir nuevos libros, autores, y gestionar préstamos.


## Instalación y configuración

### 1. Clonar el repositorio
```bash
git clone git@github.com:matiascabrera2/TP-Sitio-Web---Intro.-Des.-Software.git
```
```bash
cd TP-Sitio-Web---Intro.-Des.-Software.git
```

### Instalar dependencias y inicializar .json package   --- Esta parte se elimina creo
```bash
npm i express pg nodemon
```
- Recordar agregar el type: module, para las extesiones `import ... from ...`

### 2. Configurar variables de entorno
En caso de no tenerlo, crea un archivo `.env` en la raíz del proyecto (si no se creó automáticamente al instalar Prisma) 
con las siguientes variables:

```bash
# Configuracion del Frontend
FRONTEND_PORT=5500

# Configuración del Backend
BACKEND_PORT=5000

# Configuración de la Base de Datos
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=db_sqlazo

# Variables de conexión predeterminadas para DB
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
PGDATA=/var/lib/postgresql/data/pgdata  # Ruta de almacenamiento de datos de PostgreSQL

# Configuración de Prisma y Base de Datos
# Ejemplo para la lectura = postrgresql://user:passwordeserver:port/db_name
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/db_sqlazo?schema=public"
```
Asegúrate de reemplazar los valores por los correspondientes a tu entorno local (DB_USER, DB_PASSWORD, etc).

En caso de tener problemas de autenticación con PostgreSQL, revisa la configuración de autenticación en el archivo `pg_hba.conf` y asegúrate de que esté habilitada la autenticación `md5` para las conexiones locales:
```bash
# Línea de ejemplo para habilitar MD5
host    all             all             127.0.0.1/32            md5
```

### 3. Ejecutar el servidor
1. Asegurarse de tener Docker y Docker Compose instalados.
    Si aún no tienes Docker y Docker Compose instalados en `Linux`, haz lo siguientes pasos:
    - Para instalar Docker:
```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo systemctl enable docker
sudo systemctl start docker
```
    - OPCIONAL --- Si deseas ejecutar Docker sin usar sudo cada vez, puedes agregar tu usuario al grupo Docker:
```bash
sudo usermod -aG docker $USER
```
    - Para instalar Docker-compose:
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```
2. Ejecutar el siguiente comando en la raíz del proyecto:
```bash
docker-compose up --build
```
3. El backend estará disponible en lo especificado en `docker-compose.yml`.
    - En general, se encontrará en `http://localhost:3000`.

## Pruebas

Puedes probar la API usando herramientas como Postman o cURL. 
- Ejemplo para listar los libros:

```bash
curl http://localhost:3000/api/libros
```
- En caso de usar postman, utiliza la solicitud correspondiente.
La documentación de la API generada por Postman aun no esta disponible. Por ahora, puedes probar la API usando curl o postman con la direcciones aclaradas en la seccion `Rutas de la API`.

## Rutas de la API --- DE MOMENTO ESTO ES UN ESBOZO

### 1. Libros (/api/libros)
- **GET** `/api/libros`: Obtiene la lista de todos los libros.
- **POST** `/api/libros`: Agrega un nuevo libro.
- **GET** `/api/libros/:id`: Obtiene los detalles de un libro por su ID.
- **PUT** `/api/libros/:id`: Modifica los datos de un libro existente.
- **DELETE** `/api/libros/:id`: Elimina un libro.

### 2. Autores (/api/autores)
- **GET** `/api/autores`: Lista todos los autores.
- **POST** `/api/autores`: Agrega un nuevo autor.
- **GET** `/api/autores/:id`: Obtiene información de un autor específico.
- **PUT** `/api/autores/:id`: Modifica los datos de un autor existente.
- **DELETE** `/api/autores/:id`: Elimina un autor.

### 3. Préstamos (/api/prestamos)
- **GET** `/api/prestamos`: Lista todos los préstamos registrados.
- **POST** `/api/prestamos`: Registra un nuevo préstamo.
- **GET** `/api/prestamos/:id`: Detalles de un préstamo específico.
- **PUT** `/api/prestamos/:id`: Actualiza información de un préstamo (estado, fecha de devolución, etc.).
- **DELETE** `/api/prestamos/:id`: Elimina un registro de préstamo.
