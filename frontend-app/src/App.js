import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import AddUser from "./pages/addUser";
import Books from "./pages/books";
import PlayGround from "./pages/playGround";
import Register from "./pages/register";
import SandBox from "./pages/sandBox";
import User from "./pages/user";
import Users from "./pages/users";

import Pagination from "./pages/pagination";
import SideBar from "./pages/sidebar";
import List from "./pages/list";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="container mt-5">
        <Switch>
          <Route exact path="/users/add-new-user" component={AddUser} />
          <Route exact path="/users/:id" component={User} />
          <Route exact path="/playground" component={PlayGround} />
          <Route exact path="/sandbox" component={SandBox} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/pagination" component={Pagination} />
          <Route exact path="/drawer" component={SideBar} />
          <Route exact path="/list" component={List} />
          <Route exact path="/" component={Users} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
