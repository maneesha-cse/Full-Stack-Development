
import { Link, useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();

  return (
    <div>
      <h2>Student ID: {id}</h2>
      <Link to="/students">Back to students</Link>
    </div>
  );
}

export default Details;
