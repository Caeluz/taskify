# Prequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

# Installation

1. Clone the repository
2. Install dependencies
3. Create a `.env` file
4. Run the server

## 1. Clone the repository

```bash
git clone
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create a `.env` file

Create a `.env` file in the root directory of the project. Add the following environment variables:

```env
<!-- DATABASE_URL=postgres://user:password@localhost:5432/database -->
DB_HOST=localhost
DB_NAME=taskify
DB_USER=postgres
DB_PASSWORD= 'your password'
```

## 4. Run the server

```bash
npm start
```
