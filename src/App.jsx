import "./App.css";
import { Book, RefreshCw, Users } from "lucide-react";
import Books from "./components/Books";

function App() {
  return (
    <div className="container">
      <div className="side-bar">
        <div id="title">
          <img src="library-100.png" alt="shelf icon" />
          <p>BookNest</p>
        </div>
        <nav className="links">
          <a href="#" className="active">
            <Book size={20} className="mr-2" />
            Books
          </a>
          <a href="#">
            <RefreshCw size={20} className="mr-2" />
            Transactions
          </a>
          <a href="#">
            <Users size={20} className="mr-2" />
            Members
          </a>
        </nav>
      </div>
      <div className="main">
        <Books />
      </div>
    </div>
  );
}

export default App;
