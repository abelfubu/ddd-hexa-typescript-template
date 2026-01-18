CREATE TABLE users (
    id uuid PRIMARY KEY NOT NULL,
    username text UNIQUE NOT NULL,
    email text UNIQUE NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id uuid PRIMARY KEY NOT NULL,
    "userId" uuid REFERENCES users (id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    completed boolean DEFAULT FALSE,
    "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_userId ON tasks (userId);

CREATE INDEX idx_tasks_completed ON tasks (completed);

INSERT INTO users (id, username, email, password)
    VALUES ('11111111-1111-1111-1111-111111111111', 'testuser', 'test@user.com', '$2b$10$4whsaypYEzQNMAFT9aglgefpzCNv96NeFNWgvpVqilPfGBafKmvpi');

INSERT INTO tasks (id, userId, title, description, completed)
    VALUES ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Sample Task', 'This is a sample task description.', FALSE);

