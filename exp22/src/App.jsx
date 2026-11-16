
import "./App.css";

function App() {
  const patients = [
    { id: 1, name: "Maneesha", age: 30, gender: "female", ward: "A" },
    { id: 2, name: "Vamsi Krishna", age: 25, gender: "male", ward: "B" },
    { id: 3, name: "Nivedita", age: 21, gender: "female", ward: "C" }
  ];

  return (
    <div className="App">
      <h1>React Rendering Lists</h1>

      <table className="patient-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Ward</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.ward}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
