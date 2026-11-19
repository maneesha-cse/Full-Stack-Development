
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function AddEditForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/api/v1/posts/${id}`)
        .then((response) => {
          if (!response.ok) throw new Error("Post not found");
          return response.json();
        })
        .then((result) => {
          setTitle(result.data.title);
          setContent(result.data.content);
        })
        .catch((error) => alert(error.message));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        id ? `${API_URL}/api/v1/posts/${id}` : `${API_URL}/api/v1/posts`,
        {
          method: id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        }
      );

      if (!response.ok) throw new Error("Failed to save post");

      alert(id ? "Post updated successfully!" : "Post created successfully!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>{id ? "Update Post" : "Create Post"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          {id ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default AddEditForm;
