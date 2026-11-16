import express from "express";
import mongoose from "mongoose";
import movieRoutes from "./Routes/movieRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/movies", movieRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/moviesDB")
    .then(() => {
        console.log("MongoDB connected");

        app.listen(4000, () => {
            console.log("Server running on port 4000");
        });
    })
    .catch(err => {
        console.log("MongoDB connection failed:", err.message);
    });