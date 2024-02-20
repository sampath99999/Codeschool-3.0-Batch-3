-- Active: 1708259727131@@127.0.0.1@5432@task_tracker@public
CREATE TABLE Users (
    email VARCHAR(255) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    token VARCHAR(255)
);

CREATE TABLE Task (
    task_id SERIAL PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    priority VARCHAR(50),
    task_description TEXT,
    Deadline DATE,
    task_status VARCHAR(50),
    email VARCHAR(255),
    FOREIGN KEY (email) REFERENCES Users(email)
);

select *from users;

