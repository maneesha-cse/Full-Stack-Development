const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

const app = express();
app.use(express.json());

app.post("/todos", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/todos", async (req, res) => {
  try {
    res.json(await Todo.find());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const item = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(item);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const item = await Todo.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const PORT = 4000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Error:", err.message);
  });