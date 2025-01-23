create table autor (
    id serial primary key,
    name string not null,
    nacionality string not null,
    born_date date not null,
    biografity string not null,
    stock_books integer,
    
)

create table libro (
    id serial primary key,
    availability string not null,
    titulo string not null,
    autor_id integer not null,
    publication_date date not null,
    genre string not null,
    language string not null,
    pages integer not null,
    loan_price decimal not null,
    foreign key (autor_id) references autor(id)
)

create table prestamo (
    id serial primary key,
    reader string not null,
    libro_id integer not null,
    loan_date date not null,
    return_date date not null,
    price decimal not null,
    foreign key (libro_id) references libro(id)
)

