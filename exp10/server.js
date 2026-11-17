
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = 6500;

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Third-party middleware
app.use(cors());
app.use(morgan("dev"));

// Application-level middleware
app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);

  const start = Date.now();

  res.on("finish", () => {
    const log = `${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms\n`;
    fs.appendFile("server.log", log, (err) => {
      if (err) console.error(err);
    });
  });

  next();
});

// Patient data
let patients = [];
let nextId = 1;

// Route-specific middleware
const validatePatient = (req, res, next) => {
  const { name, age, blood } = req.body;

  if (!name || !age || !blood || age <= 0) {
    return res.status(400).json({
      message: "Invalid patient data"
    });
  }

  next();
};

// POST - Create patient
app.post("/api/v1/patients", validatePatient, (req, res) => {
  const patient = {
    id: nextId++,
    name: req.body.name,
    age: req.body.age,
    blood: req.body.blood
  };

  patients.push(patient);

  res.status(201).json({
    message: "Patient created successfully",
    data: patient
  });
});

// GET - Read all patients
app.get("/api/v1/patients", (req, res) => {
  res.status(200).json({
    message: "Patients fetched successfully",
    data: patients
  });
});

// GET - Read patient by ID
app.get("/api/v1/patients/:id", (req, res, next) => {
  const patient = patients.find(p => p.id === Number(req.params.id));

  if (!patient) {
    const err = new Error("Patient not found");
    err.statusCode = 404;
    return next(err);
  }

  res.status(200).json({
    message: "Patient details fetched successfully",
    data: patient
  });
});

// PUT - Update patient
app.put("/api/v1/patients/:id", validatePatient, (req, res, next) => {
  const patient = patients.find(p => p.id === Number(req.params.id));

  if (!patient) {
    const err = new Error("Patient not found");
    err.statusCode = 404;
    return next(err);
  }

  patient.name = req.body.name;
  patient.age = req.body.age;
  patient.blood = req.body.blood;

  res.status(200).json({
    message: "Patient updated successfully",
    data: patient
  });
});

// DELETE - Delete patient
app.delete("/api/v1/patients/:id", (req, res, next) => {
  const index = patients.findIndex(p => p.id === Number(req.params.id));

  if (index === -1) {
    const err = new Error("Patient not found");
    err.statusCode = 404;
    return next(err);
  }

  const deletedPatient = patients.splice(index, 1)[0];

  res.status(200).json({
    message: "Patient deleted successfully",
    data: deletedPatient
  });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error"
  });
});

// 404 middleware
app.use((req, res) => {
  res.status(404).json({
    message: "Resource not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
