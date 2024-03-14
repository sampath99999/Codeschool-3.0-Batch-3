-- Active: 1699516286983@@127.0.0.1@5432@blog@public

CREATE TABLE users (
    id SERIAL PRIMARY KEY, username VARCHAR(250) NOT NULL, email VARCHAR(250) NOT NULL, password VARCHAR(250) NOT NULL, token VARCHAR(255) UNIQUE
);

SELECT * FROM users;

CREATE TABLE movies (
    movie_id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, director VARCHAR(255), rating DECIMAL(3, 1), poster_url VARCHAR(255), watched BOOLEAN DEFAULT FALSE,category_id INT REFERENCES categories(category_id)
);

SELECT * FROM movies;

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL
);

SELECT * FROM categories;



INSERT INTO

    categories (name)
VALUES ('Action'),
    ('Love'),
    ('Horror'),
    ('Comedy'),
    ('Fantasy'),
    ('Romance');


