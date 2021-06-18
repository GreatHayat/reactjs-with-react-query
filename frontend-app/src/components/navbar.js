import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Users
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/playground">
                  PlayGround
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/sandbox">
                  SandBox
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/books">
                  Books
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/register">
                  Formik
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/pagination">
                  Pagination
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/drawer">
                  Drawer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default NavBar;
