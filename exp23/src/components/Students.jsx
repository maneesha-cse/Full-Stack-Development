
import { Link } from "react-router-dom";

function Students() {
  return (
    <div>
      <h1>Students Page</h1>

      <nav className="students-nav">
        <Link to="/students/1">Go to student 1 details</Link>
        <Link to="/students/2">Go to student 2 details</Link>
        <Link to="/students/3">Go to student 3 details</Link>
      </nav>
    </div>
  );
}

export default Students;
