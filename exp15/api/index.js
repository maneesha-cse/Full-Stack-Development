const mongoose = require("mongoose");
const Todo = require("../models/Todo");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = async (req, res) => {
  try {
    await connectDB();

    const { method, url } = req;
    const id = url.split("?")[0].split("/").filter(Boolean).pop();

    if (method === "POST" && url.split("?")[0] === "/todos") {
      const todo = await Todo.create(req.body);
      return res.status(201).json(todo);
    }

    if (method === "GET" && url.split("?")[0] === "/todos") {
      const todos = await Todo.find();
      return res.json(todos);
    }

    if (method === "PUT" && id && id !== "todos") {
      const todo = await Todo.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      return res.json(todo);
    }

    if (method === "DELETE" && id && id !== "todos") {
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      return res.json({ message: "Todo deleted" });
    }

    return res.status(404).json({ message: "Route not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};