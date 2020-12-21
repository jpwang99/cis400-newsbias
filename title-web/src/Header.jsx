import React from "react";
import ReactGa, { OutboundLink } from "react-ga";
import { Container, Row, Col } from "react-bootstrap";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const Header = (props) => {
  const fullName = props.user
    ? `${props.user.first_name} ${props.user.last_name}`
    : "";

  const logout = async () => {
    const request = new Request(`/api/v1/auth/logout`, {
      body: JSON.stringify(),
      headers: {
        Accept: "application/json",
      },
      method: "POST",
    });
    await fetch(request);

    const cookies = new Cookies();
    cookies.set("user", null, { path: "/" });

    ReactGa.event({
      category: "User",
      action: "Logged Out",
    });
    ReactGa.set({ userId: null });

    window.location.href = "/login";
  };

  return (
    <Container
      component="header"
      fluid
      id="collection-5d838b677bb21d4a550fe7d2"
      style={{
        backgroundColor: "#f8f8f8",
        color: "white",
      }}
    >
      <Row>
        <Col>
          <a
            href="/"
            style={{
              fontSize: 38,
              fontWeight: "bold",
              padding: 0,
              margin: 0,
              color: "black",
              display: "inline-block",
            }}
          >
            T I T L E
          </a>
          <p
            style={{
              fontSize: 18,
              padding: 0,
              marginTop: 0,
              marginBottom: 30,
              marginLeft: 25,
              color: "black",
              fontWeight: "normal",
              display: "inline-block",
            }}
          >
            a news bias detector
          </p>
        </Col>
        <Col
          style={{
            textAlign: "right",
          }}
        >
          <p
            style={{
              fontSize: 38,
              fontWeight: "bold",
              padding: 0,
              margin: 0,
              color: "black",
              display: "inline-block",
              color: "#f8f8f8",
            }}
          >
            T I T L E
          </p>
          <a
            href="https://www.youtube.com/watch?v=QtBDL8EiNZo"
            target="_blank"
            style={{
              fontSize: 18,
              padding: 0,
              marginTop: 0,
              textAlign: "right",
              marginBottom: 30,
              marginLeft: 25,
              color: "black",
              fontWeight: "normal",
              display: "inline-block",
              height: "100%",
            }}
          >
            settings
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
