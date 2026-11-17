
import express from "express";

import {
  createMovie,
  readMovies,
  readMovieById,
  updateMovieById,
  deleteMovieById
} from "../controllers/movieController.js";

const router = express.Router();

// Create a movie
router.post("/", createMovie);

// Get all movies
router.get("/", readMovies);

// Get a movie by ID
router.get("/:id", readMovieById);

// Update a movie by ID
router.put("/:id", updateMovieById);

// Delete a movie by ID
router.delete("/:id", deleteMovieById);

export default router;
