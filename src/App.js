import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import Browse from "./containers/Browse/Browse";
import ItemSelected from "./containers/ItemSelected/ItemSelected";
import Register from "./containers/Register/Register";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/browse" component={Browse} />
            <Route path="/itemSelected" component={ItemSelected} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
