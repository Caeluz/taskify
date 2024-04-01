import express from "express";
const app = express();
const cors = require("cors");
const PORT = 8080;

// Users
const usersRouter = require("./src/users/routes");
// import usersRouter from "./src/users/routes";

app.use(cors());

app.use("/api/users", usersRouter);

app.get("/api/home", (req, res) => {
  res.json({
    message: "Hello World",
    people: [
      { id: 1, name: "test" },
      { id: 2, name: "2" },
    ],
  });
});

// app.use(usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
