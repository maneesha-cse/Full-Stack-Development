
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();

const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {
  await client.connect();
  db = client.db("booksDB");
  console.log("Connected to MongoDB");
}

// POST: Add book
app.post("/api/v1/books", async (req, res) => {
  try {
    const { title, author, category, publication } = req.body;

    if (!title || !author || !category || !publication) {
      return res.status(400).json({
        message: "All book fields are required"
      });
    }

    const result = await db.collection("books").insertOne({
      title,
      author,
      category,
      publication
    });

    res.status(201).json({
      message: "Book added successfully",
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: All books
app.get("/api/v1/books", async (req, res) => {
  try {
    const books = await db.collection("books").find().toArray();

    res.status(200).json({
      message: "Books fetched successfully",
      data: books
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Book by ID
app.get("/api/v1/books/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid book ID"
      });
    }

    const book = await db.collection("books").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.json({
      message: "Book fetched successfully",
      data: book
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update book
app.put("/api/v1/books/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid book ID"
      });
    }

    const { title, author, category, publication } = req.body;

    const result = await db.collection("books").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { title, author, category, publication } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.json({
      message: "Book updated successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE: Remove book
app.delete("/api/v1/books/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid book ID"
      });
    }

    const result = await db.collection("books").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.json({
      message: "Book deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch(error => {
  console.error("MongoDB connection failed:", error.message);
});

