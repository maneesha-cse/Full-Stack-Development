
import React from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Post({ post }) {
  const navigate = useNavigate();

  const deletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`${API_URL}/api/v1/posts/${post._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <button onClick={() => navigate(`/update-post/${post._id}`)}>
        Edit
      </button>

      <button onClick={deletePost}>Delete</button>
    </div>
  );
}

export default Post;
