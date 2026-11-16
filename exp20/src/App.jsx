
import "./App.css";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [branch, setBranch] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Name: ${name}, Age: ${age}, Branch: ${branch}, Gender: ${gender}`
    );
  };

  const handleClear = () => {
    setName("");
    setAge("");
    setBranch("");
    setGender("");
  };

  return (
    <div className="App">
      <h1 className="title">Student Form</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>

        <div className="gender-group">
          <span>Gender:</span>

          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
        </div>

        <label>
          Branch:
          <select
            name="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="">Select branch</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="MEC">MEC</option>
          </select>
        </label>

        <div className="button-group">
          <button className="submit-button" type="submit">
            Submit
          </button>

          <button
            className="reset-button"
            type="button"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
