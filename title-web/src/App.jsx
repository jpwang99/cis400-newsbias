import React from "react";
import ReactGa from "react-ga";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import * as Sentry from "@sentry/react";
import Cookies from "universal-cookie";

import Header from "./Header";
import Footer from "./Footer";
import Welcome from "./Welcome";
import Article from "./Article";

import "bootstrap/dist/css/bootstrap.min.css";

Sentry.init({
  debug: process.env.NODE_ENV !== "production",
  dsn:
    "https://dffe5ebe90804b0e9a7a47b7544f44b3@o436963.ingest.sentry.io/5398829",
  environment: process.env.NODE_ENV,
});

ReactGa.initialize("UA-175802980-1", {
  testMode: ["test", "development"].includes(process.env.NODE_ENV),
});

function App() {
  const cookies = new Cookies();
  const user = cookies.get("user", { path: "/" });
  if (user && user.id) {
    ReactGa.set({ userId: user.id });
  }

  return (
    <BrowserRouter>
      <div
        data-testid="browser-router-div"
        style={{ backgroundColor: "black" }}
      >
        <Switch>
          <Route path="/home" component={Welcome} />
          <Route path="/">
            <Header user={user} />
            <main>
              <Switch>
                <Route path="/article" component={Article} />
              </Switch>
            </main>
            <Footer />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
