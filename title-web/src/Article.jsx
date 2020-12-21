import React, { useEffect, useState } from "react";
import Scraper from "./scraper";

const axios = require("axios");

function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api.example.com/items")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
    );
  }
}

class form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "booop" };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    alert(this.state.username);
    axios
      .get("".concat(this.state.username))
      .then(function (response) {
        // handle success
        alert(response.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        alert("error".concat(error));
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  myChangeHandler = (event) => {
    this.setState({ username: event.target.value });
    this.state.username = event.target.value;
  };
}

function Article() {
  var f = new form();

  return <Scraper></Scraper>;
}

export default Article;
