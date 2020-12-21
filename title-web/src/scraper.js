import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
require("@tensorflow/tfjs");
const toxicity = require("@tensorflow-models/toxicity");

// The minimum prediction confidence.
const threshold = 0.9;

class Scraper extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      html: "HTML scraped",
      score: 0,
      align: "center",
      offset: "50%",
      color: "#000000",
    };
  }

  classify(html) {
    // Load the model. Users optionally pass in a threshold and an array of
    // labels to include.
    // alert(html);
    toxicity.load(threshold).then((model) => {
      const sentences = [html];

      model.classify(sentences).then((predictions) => {
        // `predictions` is an array of objects, one for each prediction head,
        // that contains the raw probabilities for each input along with the
        // final prediction in `match` (either `true` or `false`).
        // If neither prediction exceeds the threshold, `match` is `null`.
        const sc = Math.round(
          predictions[6].results[0].probabilities[1] * 5000 - 25
        );
        if (sc < -25) {
          this.state.align = "far left";
          this.state.color = "#38ACDF";
        } else if (sc < -10) {
          this.state.align = "leans left";
          this.state.color = "#38ACDF";
        } else if (sc < 10) {
          this.state.align = "center";
          this.state.color = "#836683";
        } else if (sc < 25) {
          this.state.align = "leans right";
          this.state.color = "#D01C27";
        } else {
          this.state.align = "far right";
          this.state.color = "#D01C27";
        }
        this.state.offset = this.state.score + 50 + "%";
        this.state.score = sc;
        /*
      prints:
      {
        "label": "identity_attack",
        "results": [{
          "probabilities": [0.9659664034843445, 0.03403361141681671],
          "match": false
        }]
      },
      {
        "label": "insult",
        "results": [{
          "probabilities": [0.08124706149101257, 0.9187529683113098],
          "match": true
        }]
      },
      ...
       */
      });
    });
  }
  getElementByXpath(path) {
    return document.evaluate(
      path,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  }
  removeTags(inUrl, stringContent) {
    if (stringContent.length < 6) {
      return "";
    }
    const el = document.createElement("div");
    el.innerHTML = stringContent;
    const pa = el.getElementsByTagName("P");
    if (pa.length > 0) {
      var schema = "";
      if (inUrl.includes("cnn.com")) {
        schema = '//*[@id="body-text"]/div[1]/div[';
      } else if (inUrl.includes("nypost.com")) {
        schema = '//*[@id="article-wrapper"]/div[2]/div[1]/div[5]/p[';
      } else if (inUrl.includes("apnews.com")) {
        schema = '//*[@id="root"]/div/main/div[3]/div/div[6]/p[';
      } else if (inUrl.includes("reuters.com")) {
        schema = '//*[@id="__next"]/div/div[4]/div[1]/article/div[1]/p[';
      } else if (inUrl.includes("oann.com")) {
        schema = '//*[@id="post-2347539"]/div[2]/p[';
      } else if (inUrl.includes("foxnews.com")) {
        schema =
          '//*[@id="wrapper"]/div[3]/div[1]/main/article/div/div[1]/div[1]/p[';
      } else if (inUrl.includes("nytimes.com")) {
        schema = '//*[@id="story"]/section/div/div/p[';
      } else {
        return "";
      }
      var a = "";
      var x = document.evaluate(
        schema + "1]",
        el,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      if (x == null) {
        return a;
      } else {
        a = x.innerHTML.concat("\n\n");
      }
      var i = 2;
      var b = document.evaluate(
        schema.concat(i).concat("]"),
        el,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      while (b != null) {
        a = a.concat(b.innerHTML.concat("\n\n"));
        i++;
        b = document.evaluate(
          schema.concat(i).concat("]"),
          el,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
      }
      this.classify(a);
      return a;
    }
    return "";
  }
  render() {
    const search = (
      <Container
        fluid
        style={{
          backgroundColor: "#f8f8f8",
          width: "100vw",
        }}
      >
        <div
          style={{
            backgroundColor: "#f8f8f8",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={this.state.url}
              onChange={this.setUrl.bind(this)}
              placeholder="https://www.nytimes.com/2020/03/18/us/politics/universal-basic-income-andrew-yang.html"
              style={{
                borderWidth: 0,
                backgroundColor: "#f8f8f8",
                width: 539,
                borderBottom: "1px solid #5c5c5c",
                fontSize: 13,
                display: "inline-block",
                color: "black",
                fontWeight: "lighter",
              }}
            />
            <button
              style={{
                borderStyle: "none",
                background: "none",
                display: "inline-block",
                marginLeft: "10px",
              }}
              onClick={this.sendUrl.bind(this)}
            >
              submit
            </button>
          </div>
          <Row>
            <Col sm={10}>
              <textarea
                style={{
                  textAlign: "left",
                  paddingLeft: "0%",
                  paddingRight: "0%",
                  paddingBottom: 20,
                  paddingTop: 50,
                  marginBottom: 0,
                  width: "100%",
                  height: "100vh",
                  backgroundColor: "#f8f8f8",
                  borderStyle: "none",
                }}
                value={this.removeTags(this.state.url, this.state.html).replace(
                  /<[^>]+>/g,
                  ""
                )}
              ></textarea>
            </Col>
            <Col sm={2}>
              <p
                style={{
                  color: this.state.color,
                  margin: 0,
                  padding: 0,
                  paddingBottom: 5,
                }}
              >
                ({this.state.score}) {this.state.align}
              </p>
              <div
                style={{
                  backgroundColor: "black",
                  height: 6,
                  width: "2%",
                  color: "red",
                  marginLeft: this.state.offset,
                }}
              ></div>
              <div
                style={{
                  background: "linear-gradient(to right, #38ACDF, #D01C27)",
                  height: 6,
                  width: "100%",
                  color: "red",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "black",
                  height: 6,
                  width: "2%",
                  color: "red",
                  marginLeft: this.state.offset,
                }}
              ></div>
              <a
                href="https://www.youtube.com/watch?v=8ybW48rKBME"
                target="_blank"
                style={{ color: "black" }}
              >
                learn more
              </a>
            </Col>
          </Row>
        </div>
      </Container>
    );
    return <div>{search}</div>;
  }

  setUrl(evt) {
    this.setState({
      ...this.state,
      url: evt.target.value,
    });
  }

  sendUrl() {
    axios
      .get("http://localhost:8081/scrape", {
        params: { url: this.state.url },
      })
      .then((response) => {
        this.setState({
          ...this.state,
          html: response.data,
        });
      });
  }
}

export default Scraper;
