import React, { useEffect, useState } from "react";
import ReactGa from "react-ga";
import { Container, Row } from "reactstrap";
import Cookies from "universal-cookie";
import "./App.css";

class form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    window.location.href = "/article";
  };
  myChangeHandler = (event) => {
    this.setState({ username: event.target.value });
  };
}

function Welcome() {
  var f = new form();
  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: "#f8f8f8" }}>
        <p
          style={{
            fontSize: 73,
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
            fontSize: 23,
            padding: 0,
            marginTop: 0,
            marginBottom: 30,
            color: "black",
            fontWeight: "normal",
          }}
        >
          a news bias detector
        </p>
        <form onSubmit={f.mySubmitHandler}>
          <input
            type="text"
            placeholder="search for articles or paste a link here"
            onChange={f.myChangeHandler}
            style={{
              borderWidth: 0,
              backgroundColor: "#f8f8f8",
              width: 233,
              borderBottom: "1px solid #5c5c5c",
              fontSize: 13,
            }}
          />
        </form>
      </header>
    </div>
  );
}

export default Welcome;
