CREATE TYPE user_type AS ENUM ('Admin', 'User');

CREATE TABLE
    Users (
        ID SERIAL PRIMARY KEY,
        Username VARCHAR(50),
        Password VARCHAR(100),
        Email VARCHAR(100),
        User_Type user_type DEFAULT 'User',
        Token varchar,
        Active_Status boolean DEFAULT true,
        Created_At TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        Deleted_At TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    Tasks (
        Task_ID SERIAL PRIMARY KEY,
        Title VARCHAR(100),
        Description TEXT,
        Deadline DATE,
        Status VARCHAR(20) DEFAULT 'New',
        Assigned_To INT,
        CreatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (Assigned_To) REFERENCES Users (ID)
    );