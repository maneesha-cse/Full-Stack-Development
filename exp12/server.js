
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// Cached MongoDB connection
let dbConnection;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;

  if (!dbConnection) {
    dbConnection = mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || "movieDB"
    }).catch(error => {
      dbConnection = null;
      throw error;
    });
  }

  await dbConnection;
}

// Ensure database connection before API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({
      message: "MongoDB connection failed",
      error: error.message
    });
  }
});

// Movie Schema
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String },
  category: { type: String, required: true },
  year: { type: Number, required: true }
});

const Movie = mongoose.models.Movie ||
  mongoose.model("Movie", movieSchema, "movies");

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Movie API server running successfully" });
});

// POST: Create movie
app.post("/api/v1/movie", async (req, res) => {
  try {
    const result = await Movie.create(req.body);

    res.status(201).json({
      message: "Movie created successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET: All movies
app.get("/api/v1/movie", async (req, res) => {
  try {
    const query = req.query.category
      ? { category: req.query.category }
      : {};

    const result = await Movie.find(query);

    res.json({
      message: "Movies fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Movie by ID
app.get("/api/v1/movie/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }

    const result = await Movie.findById(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({
      message: "Movie details fetched successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update movie
app.put("/api/v1/movie/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }

    const result = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({
      message: "Movie updated successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Remove movie
app.delete("/api/v1/movie/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }

    const result = await Movie.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({
      message: "Movie deleted successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Local server
if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
      });
    })
    .catch(error => {
      console.error("MongoDB connection failed:", error.message);
    });
}

module.exports = app;
