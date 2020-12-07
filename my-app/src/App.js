import logo from "./logo.svg";
import "./App.css";
import React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You are submitting " + this.state.username);
  };
  myChangeHandler = (event) => {
    this.setState({ username: event.target.value });
  };
}
function App() {
  var f = new form();
  return (
    <div className="App">
      <header
        className="App-header"
        style={{ backgroundColor: "rgb(248,248,248" }}
      >
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p
          style={{
            fontSize: 58,
            fontWeight: "bold",
            padding: 0,
            margin: 0,
            color: "black",
          }}
        >
          T I T L E
        </p>
        <p
          style={{
            fontSize: 15,
            padding: 0,
            marginTop: 0,
            marginBottom: 30,
            color: "black",
            fontWeight: "normal",
          }}
        >
          a news bias detector
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <form onSubmit={f.mySubmitHandler}>
          <input
            type="text"
            placeholder=" search for articles or paste a link here"
            onChange={f.myChangeHandler}
            style={{
              borderWidth: 0,
              backgroundColor: "rgb(248,248,248)",
              width: 230,
              borderBottom: "1px solid #5c5c5c",
            }}
          />
        </form>
      </header>
    </div>
  );
}

export default App;
