# NodeJS (Express JS) TypeScript API Project

This project demonstrates a Node.js (Express JS) application with TypeScript that uses Axios for making HTTP requests to an external API, caches data, and saves it to a database for DOT Assessment Test.

## Features
- Implements HTTP methods (GET, POST, PUT, PATCH, DELETE) with Axios.
- Caches API responses to minimize external requests using lru-cache.
- Saves data to MySQL database using Prisma ORM.
- Follows MVC architecture (Contract & Service Pattern).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ilhamsg7/dot-assessment-test.git
   cd dot-assessment-test
   ```
2. Install dependency
    ```bash
    pnpm install
   ```
3. Copy .env.example to .env
    ```bash
        cp .env.example .env
    ```
4. Setup your database in .env file
    ```
        DATABASE_URL=mysql://your_username:your_password@localhost:3306/your_database
    ```
5. Migrate and run seeder for database
    ```bash
        pnpx prisma migrate dev
    ```

    ```bash
        pnpm exec tsx ./prisma/seed.ts
    ```
6. To develop all apps and packages, run the following command
    ```bash
        pnpm run dev
    ```