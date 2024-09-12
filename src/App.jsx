import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="side-bar">
        <div id="title">
          {/* <img src="shelf-icon.png" alt="shelf icon" /> */}
          <p>BookNest</p>
        </div>
        <div className="links">
          <a href="#">Books</a>
          <a href="#">Transacations</a>
          <a href="#">Members</a>
        </div>
      </div>
      <div className="main">
        <h1>BookNest</h1>
        <h2>Your handy library management tool.</h2>
      </div>
    </div>
  );
}

export default App;
