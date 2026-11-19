
import React, { useEffect, useState } from "react";
import Post from "./Post";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/posts`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch posts");
        return response.json();
      })
      .then((result) => setPosts(result.data || []))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>All Blog Posts</h2>

      {posts.length === 0 ? (
        <p>No posts available. Create your first post!</p>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
}

export default Home;
