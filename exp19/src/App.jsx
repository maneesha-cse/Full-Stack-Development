
import { useState } from "react";

function App() {
  const [bgColor, setBgColor] = useState("white");

  const handleBlue = () => setBgColor("blue");
  const handleGreen = () => setBgColor("green");
  const handleYellow = () => setBgColor("yellow");

  return (
    <div style={{
      backgroundColor: bgColor,
      minHeight: "100vh",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1>React State and Events</h1>

      <button type="button" onClick={handleBlue}>Blue</button>{" "}
      <button type="button" onClick={handleGreen}>Green</button>{" "}
      <button type="button" onClick={handleYellow}>Yellow</button>
    </div>
  );
}

export default App;
