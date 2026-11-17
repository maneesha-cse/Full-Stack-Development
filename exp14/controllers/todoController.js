
const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      description: req.body.description,
      user: req.userId
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.userId });
  res.json(todos);
};

exports.updateTodo = async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed
    },
    { new: true, runValidators: true }
  );

  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    user: req.userId
  });

  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json({ message: "Todo deleted successfully" });
};
