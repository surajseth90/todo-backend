const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoScheme = new Schema({
  title: { type: String, required: true },
  detail: { type: String, required: true },
  complete: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", TodoScheme);

module.exports = Todo;
