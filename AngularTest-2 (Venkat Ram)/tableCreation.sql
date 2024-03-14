drop table donors;

drop table users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  token VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE donors (
  id SERIAL PRIMARY KEY,
  donor_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) REFERENCES users(email),
  phone_number VARCHAR(255),
  blood_group VARCHAR(3) CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  medical_conditions TEXT,
  age INTEGER CHECK (age >= 18 AND age <= 65), 
  city VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
  );