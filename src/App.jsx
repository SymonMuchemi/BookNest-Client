import "./App.css";
import { Book, RefreshCw, Users } from "lucide-react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Books from "./components/Books";
import Members from "./components/Member";

function App() {
  return (
    <Router>
      <div className="container">
        <div className="side-bar">
          <div id="title">
            <img src="library-100.png" alt="shelf icon" />
            <p>BookNest</p>
          </div>
          <nav className="links">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Book size={20} className="icons" />
              Books
            </NavLink>
            <NavLink
              to="/transactions"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <RefreshCw size={20} className="icons" />
              Transactions
            </NavLink>
            <NavLink
              to="/member"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Users size={20} className="icons" />
              Members
            </NavLink>
          </nav>
        </div>
        <div className="main">
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/member" element={<Members />} />
            <Route
              path="/transactions"
              element={<p>Transactions page (to be implemented)</p>}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
