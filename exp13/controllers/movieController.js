
import Movie from "../models/movieModel.js";

// Create a new movie
const createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();

    res.status(201).json({
      message: "Movie created successfully",
      data: savedMovie
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem while creating movie",
      error: error.message
    });
  }
};

// Get all movies
const readMovies = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};
    const movies = await Movie.find(filter);

    res.status(200).json({
      message: "Movies retrieved successfully",
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem while retrieving movies",
      error: error.message
    });
  }
};

// Get a movie by ID
const readMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found"
      });
    }

    res.status(200).json({
      message: "Movie retrieved successfully",
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem while retrieving movie",
      error: error.message
    });
  }
};

// Update a movie
const updateMovieById = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        message: "Movie not found"
      });
    }

    res.status(200).json({
      message: "Movie updated successfully",
      data: updatedMovie
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem while updating movie",
      error: error.message
    });
  }
};

// Delete a movie
const deleteMovieById = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({
        message: "Movie not found"
      });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
      data: deletedMovie
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem while deleting movie",
      error: error.message
    });
  }
};

export {
  createMovie,
  readMovies,
  readMovieById,
  updateMovieById,
  deleteMovieById
};
