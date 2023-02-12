const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const dbURL =
  "mongodb+srv://todoapp1:todoapp1@todocluster1.nhuwosc.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false); // suggested by the terminal

async function connectDB() {
  try {
    await mongoose.connect(dbURL);
    console.log("connected to DB");
  } catch (error) {
    console.log("err", error);
  }
}
connectDB();

const Todo = require("./models/index");

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    detail: req.body.detail,
  });
  todo.save();
  res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  todo.save();
  res.json(todo);
});

app.put("/todo/update/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.title = req.body.title;
  todo.detail = req.body.detail;
  todo.save();
  res.json(todo);
});

app.listen(8000, () => {
  console.log("server start");
});
