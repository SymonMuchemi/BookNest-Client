import "./App.css";
import Books from "./components/Books";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="container">
      <div className="side-bar">
        <div id="title">
          <img src="library-100.png" alt="shelf icon" />
          <p>BookNest</p>
        </div>
        <div className="links">
          <a href="#">Books</a>
          <a href="#">Transacations</a>
          <a href="#">Members</a>
        </div>
      </div>
      <div className="main">
        <ErrorBoundary>
          <Books />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
