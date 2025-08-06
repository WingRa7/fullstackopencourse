import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const padding = {
  padding: 5,
};

const App = () => {
  return (
    <Router>
      <div>
        <div>
          <Link style={padding} to="/authors">
            <button>Authors</button>
          </Link>
          <Link style={padding} to="/books">
            <button>Books</button>
          </Link>
          <Link style={padding} to="/add">
            <button>Add Book</button>
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<Authors />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
