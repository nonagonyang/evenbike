import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import NavBar from "./NavBar";
import Trip from "./Trip";
import Profile from "./Profile";
import NotFound from "./NotFound";

//TODO components desgin
//TODO import components from other js files

// import Home from "./Home";
// import SnackOrBoozeApi from "./Api";
// import NavBar from "./NavBar";
// import Menu from "./Menu";
// import Item from "./Item";

function App() {
  // const [isLoading, setIsLoading] = useState(true);

  //TODO think about the state here.

  // const [refreshments, setRefreshments] = useState([]);

  //fetch map data only on the first render
  //could be a async function getMap(){}

  // useEffect(() => {
  //   async function getRefreshments() {
  //     let refreshments = await SnackOrBoozeApi.getRefreshments();
  //     setRefreshments(refreshments);
  //     setIsLoading(false);
  //   }
  //   getRefreshments();
  //   //Fetch Data only on the first render
  // }, []);

  // if (isLoading) {
  //   return <p>Loading &hellip;</p>;
  // }
  const user = { name: "cat", email: "cat@gmail.com" };

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/trip">
              <Trip />
            </Route>
            <Route exact path="/profile">
              <Profile user={user} />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
