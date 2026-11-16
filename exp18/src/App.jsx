
import React from "react";

function Header() {
  return (
    <header style={{
      backgroundColor: "#f8f8f8",
      padding: "20px",
      textAlign: "center"
    }}>
      <h2>Vasireddy Venkatadri Institute of Technology</h2>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{
      backgroundColor: "#f8f8f8",
      padding: "20px",
      textAlign: "center"
    }}>
      <p>© 2026 Vasireddy Venkatadri Institute of Technology</p>
    </footer>
  );
}

function Student(props) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      margin: "10px",
      width: "200px"
    }}>
      <h3>Name: {props.name}</h3>
      <p>Age: {props.age}</p>
    </div>
  );
}

function App() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh"
    }}>
      <Header />

      <main style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
        flex: "1"
      }}>
        <Student name="Maneesha" age={20} />
        <Student name="Priya" age={26} />
        <Student name="Vinisha" age={21} />
        <Student name="Karuna" age={20} />
        <Student name="Niveditha" age={22} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
