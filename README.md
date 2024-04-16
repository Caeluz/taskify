# Taskify

Taskify is a full-stack application built with Next.js and Node.js. It provides a task management system with a modern and responsive user interface.

## Structure

The repository is divided into two main directories:

- `client/`: Contains the frontend code of the application, built with Next.js.
- `server/`: Contains the backend code of the application, built with Node.js and PostgreSQL.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate into the `client` directory and install the dependencies: `npm install`
3. Navigate into the `server` directory and install the dependencies: `npm install`
4. Create a `.env` file in the `server` directory and add your database connection string:

```env
DATABASE_URL=postgres://user:password@localhost:5432/database
```
### Running the Application

- To start the client, navigate into the `client` directory and run: `npm run dev`
- To start the server, navigate into the `server` directory and run: `npm run dev`

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have any improvements to the application.



