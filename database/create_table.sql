create table Author (
    id serial primary key,
    name varchar not null,
    nacionality varchar not null,
    born_date date not null,
    biografity varchar not null,
    stock_books integer,
    
)

create table Books (
    id serial primary key,
    availability varchar not null,
    titulo varchar not null,
    author_id integer not null,
    publication_date date not null,
    genre varchar not null,
    language varchar not null,
    pages integer not null,
    loan_price decimal not null,
    foreign key (author_id) references Author(id)
)

create table Loans (
    id serial primary key,
    reader varchar not null,
    book_id integer not null,
    loan_date date not null,
    return_date date not null,
    price decimal not null,
    foreign key (book_id) references Books(id)
)

