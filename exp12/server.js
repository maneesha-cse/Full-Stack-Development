
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: process.env.DB_NAME || "movieDB"
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Connection failed:", err.message));

// Movie Schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

const Movie = mongoose.model("movie", movieSchema, "movies");

// POST: Create a new movie
app.post("/api/v1/movie", async (req, res) => {
  try {
    const result = await Movie.create(req.body);

    res.status(201).json({
      message: "Movie created successfully",
      data: result
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET: Read all movies or filter by category
app.get("/api/v1/movie", async (req, res) => {
  try {
    const query = req.query.category
      ? { category: req.query.category }
      : {};

    const result = await Movie.find(query);

    res.status(200).json({
      message: "Movies fetched successfully",
      data: result
    });
  } catch (err) {
    res.status(500).json({ message: "Problem in fetching movies" });
  }
});

// GET: Read movie by ID
app.get("/api/v1/movie/:id", async (req, res) => {
  try {
    const result = await Movie.findById(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie details fetched successfully",
      data: result
    });
  } catch (err) {
    res.status(400).json({ message: "Problem in fetching movie details" });
  }
});

// PUT: Update movie by ID
app.put("/api/v1/movie/:id", async (req, res) => {
  try {
    const result = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie updated successfully",
      data: result
    });
  } catch (err) {
    res.status(400).json({ message: "Problem in updating movie" });
  }
});

// DELETE: Delete movie by ID
app.delete("/api/v1/movie/:id", async (req, res) => {
  try {
    const result = await Movie.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
      data: result
    });
  } catch (err) {
    res.status(400).json({ message: "Problem in deleting movie" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Movie API server running"
  });
});

// Start server
if (require.main === module) {
  mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  });
}

module.exports = app;
