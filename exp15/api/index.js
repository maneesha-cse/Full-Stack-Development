
const mongoose = require("mongoose");
const Todo = require("../models/Todo");

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My Todo List</title>
<style>
* { box-sizing: border-box; }
body {
  margin: 0; font-family: Arial, sans-serif;
  background: #eef2ff; color: #1e293b;
  min-height: 100vh; padding: 40px 16px;
}
.container {
  max-width: 600px; margin: auto; background: white;
  padding: 30px; border-radius: 16px;
  box-shadow: 0 8px 30px #00000012;
}
h1 { text-align: center; color: #3730a3; }
.subtitle { text-align: center; color: #64748b; }
form { display: flex; gap: 10px; margin: 25px 0; }
input[type=text] {
  flex: 1; min-width: 0; padding: 13px;
  border: 1px solid #cbd5e1; border-radius: 8px;
}
button {
  border: 0; padding: 12px 16px; border-radius: 8px;
  cursor: pointer; color: white; background: #4f46e5;
}
button:hover { opacity: .88; }
ul { list-style: none; padding: 0; }
li {
  display: flex; align-items: center; gap: 12px;
  padding: 14px; margin: 10px 0;
  background: #f8fafc; border-radius: 9px;
}
li span { flex: 1; overflow-wrap: anywhere; }
li.done span { text-decoration: line-through; color: #94a3b8; }
.delete { background: #dc2626; }
#status { text-align: center; color: #64748b; }
</style>
</head>
<body>
<div class="container">
  <h1>My Todo List</h1>
  <p class="subtitle">Organize your daily tasks</p>
  <form id="todoForm">
    <input id="taskInput" type="text" placeholder="Enter a new task..." required>
    <button type="submit">Add Task</button>
  </form>
  <p id="status">Loading tasks...</p>
  <ul id="todoList"></ul>
</div>

<script>
const list = document.getElementById("todoList");
const statusText = document.getElementById("status");
const input = document.getElementById("taskInput");

async function loadTodos() {
  try {
    const response = await fetch("/todos");
    if (!response.ok) throw new Error("Could not load tasks");

    const todos = await response.json();
    list.innerHTML = "";
    statusText.textContent = todos.length ? "" : "No tasks yet. Add your first task!";

    todos.forEach(function(todo) {
      const li = document.createElement("li");
      if (todo.completed) li.classList.add("done");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", function() {
        updateTodo(todo._id, checkbox.checked);
      });

      const span = document.createElement("span");
      span.textContent = todo.task;

      const del = document.createElement("button");
      del.textContent = "Delete";
      del.className = "delete";
      del.addEventListener("click", function() {
        deleteTodo(todo._id);
      });

      li.append(checkbox, span, del);
      list.appendChild(li);
    });
  } catch (error) {
    statusText.textContent = error.message;
  }
}

document.getElementById("todoForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const task = input.value.trim();
  if (!task) return;

  const response = await fetch("/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: task, completed: false })
  });

  if (response.ok) {
    input.value = "";
    loadTodos();
  } else {
    alert("Could not add task");
  }
});

async function updateTodo(id, completed) {
  const response = await fetch("/todos/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: completed })
  });
  if (response.ok) loadTodos();
  else alert("Could not update task");
}

async function deleteTodo(id) {
  const response = await fetch("/todos/" + id, { method: "DELETE" });
  if (response.ok) loadTodos();
  else alert("Could not delete task");
}

loadTodos();
</script>
</body>
</html>`;

module.exports = async (req, res) => {
  try {
    await connectDB();

    const pathname = new URL(
      req.url,
      "https://example.com"
    ).pathname;

    if (req.method === "GET" && pathname === "/") {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);
    }

    if (req.method === "POST" && pathname === "/todos") {
      const todo = await Todo.create(req.body);
      return res.status(201).json(todo);
    }

    if (req.method === "GET" && pathname === "/todos") {
      return res.json(await Todo.find());
    }

    const match = pathname.match(/^\/todos\/([^/]+)$/);

    if (match && req.method === "PUT") {
      const todo = await Todo.findByIdAndUpdate(
        match[1],
        req.body,
        { new: true, runValidators: true }
      );

      if (!todo) return res.status(404).json({ message: "Todo not found" });
      return res.json(todo);
    }

    if (match && req.method === "DELETE") {
      const todo = await Todo.findByIdAndDelete(match[1]);

      if (!todo) return res.status(404).json({ message: "Todo not found" });
      return res.json({ message: "Todo deleted" });
    }

    return res.status(404).json({ message: "Route not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
