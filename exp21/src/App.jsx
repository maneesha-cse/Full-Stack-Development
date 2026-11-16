
import { useState } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h2>My Website</h2>
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? "Log out" : "Log in"}
        </button>
      </header>

      {isLoggedIn ? (
        <h2>Welcome back!</h2>
      ) : (
        <h2>Please log in.</h2>
      )}
    </div>
  );
}

export default App;
