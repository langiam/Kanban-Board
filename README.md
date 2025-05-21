# Kanban Board with JWT Authentication

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description

This repo contains a full-stack Kanban board application with secure login via JSON Web Tokens (JWT). The backend is built with Node.js, Express, Sequelize (PostgreSQL) and the frontend uses React + TypeScript. Both server and client are deployed on Render for zero-downtime updates.

## Table of Contents

* [Installation](#installation)
* [Features](#features)
* [Tech](#tech)
* [Usage](#usage)
* [License](#license)
* [Contribution](#contribution)
* [Testing](#testing)
* [Contact](#contact)

## Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/langiam/Kanban-Board.git
   cd Kanban-Board
   ```
2. **Checkout the `develop` branch**

   ```bash
   git checkout develop
   ```
3. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```
4. **Install client dependencies**

   ```bash
   cd ../client
   npm install
   ```
5. **Configure env files**

   * **server/.env**:

     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=kanban_db
     DB_USER=postgres
     DB_PASS=postgres
     JWT_SECRET_KEY=your_jwt_secret
     ```
   * **client/.env**:

     ```
     REACT_APP_BASE_URL=http://localhost:3001
     ```

## Features

* **Secure Authentication**: Login/logout with JWT; protected API routes
* **Kanban Board**: Create, read, update, delete tickets in three columns (`todo`, `in-progress`, `done`)
* **User Management**: CRUD endpoints for users, with password hashing
* **Associations**: Tickets belong to users; includes assigned user info on fetch
* **Deployment**: Server and client auto-deploy to Render on merges to `main`

## Tech

* **Frontend**: React, TypeScript, React Router
* **Backend**: Node.js, Express, Sequelize, PostgreSQL
* **Authentication**: JSON Web Tokens (JWT)
* **Deployment**: Render

## Usage

### Local Development

1. **Start the database** (e.g. via Docker or local Postgres).
2. **Seed a user** in your `kanban_db`:

   ```sql
   INSERT INTO users (username, password, "createdAt", "updatedAt")
   VALUES (
     'alice',
     '<bcrypt-hash-of-hunter2>',
     NOW(), NOW()
   );
   ```
3. **Run the server**

   ```bash
   cd server
   npm run dev
   ```
4. **Run the client**

   ```bash
   cd ../client
   npm run dev
   ```
5. **Browse**

   * Frontend: [http://localhost:3000](http://localhost:3000) (or Vite’s port)
   * API: [http://localhost:3001](http://localhost:3001)

### Deployment on Render

1. **Push** `develop` → `main` on GitHub.
2. **Render** will build & deploy the server (Web Service) and client (Static Site).
3. **Configure** in Render dash:

   * Server service: set `DB_*` and `JWT_SECRET_KEY`.
   * Client site: set `REACT_APP_BASE_URL` to your server’s URL.

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

## Contribution

Contributions are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/…`)
3. Commit your changes (`git commit -m "feat: …"`)
4. Push to your fork and open a Pull Request

## Testing

* No automated tests yet.
* You can manually test with **Postman** or **Insomnia**:

  * **POST** `/auth/login` → obtain JWT
  * Use `Authorization: Bearer <token>` on `/api/*` endpoints
* Feel free to add your own unit or integration tests!

## Contact

* **GitHub**: [langiam](https://github.com/langiam)
* **Email**: [ryan.matthew.lang@gmail.com](mailto:ryan.matthew.lang@gmail.com)
