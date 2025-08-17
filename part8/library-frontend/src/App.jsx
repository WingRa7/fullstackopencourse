import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";

import { useApolloClient } from "@apollo/client";

const padding = {
  padding: 5,
};

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    setToken(token);
  }, []);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
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
            <Link style={padding} to="/login">
              <button>Login</button>
            </Link>
          </div>
          <div style={padding}>
            <Notify errorMessage={errorMessage} />
          </div>

          <Routes>
            <Route path="/" element={<Authors />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/books" element={<Books />} />
            <Route
              path="/login"
              element={
                <LoginForm
                  token={token}
                  setToken={setToken}
                  setError={notify}
                />
              }
            />
            <Route path="/recommend" element={<Recommend />} />
          </Routes>
        </div>
      </Router>
    );
  }

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
          <Link style={padding} to="/recommend">
            <button>Recommend</button>
          </Link>
          <Link style={padding} to="/authors">
            <button onClick={logout}>logout</button>
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<Authors />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook />} />
          <Route
            path="/login"
            element={
              <LoginForm token={token} setToken={setToken} setError={notify} />
            }
          />
          <Route path="/recommend" element={<Recommend />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
