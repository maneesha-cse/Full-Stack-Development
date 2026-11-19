
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import AddEditForm from "./components/AddEditForm";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<AddEditForm />} />
          <Route path="/update-post/:id" element={<AddEditForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
