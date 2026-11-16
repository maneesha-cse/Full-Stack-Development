import Movie from "../models/movieModel.js";

// Create movie
export const createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all movies
export const getMovies = async (req, res) => {
    try {
        res.json(await Movie.find());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single movie
export const getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.json(movie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update movie
export const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.json(movie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete movie
export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.json({ message: "Movie deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};