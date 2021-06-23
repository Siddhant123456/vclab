import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "./icon.png";
import "./nav.css";

function NavHead() {
  const dispatch = useDispatch();
  

  const userData = useSelector((state) => state.authData);
  const logoutHandler = () => {
    dispatch({type : 'LOGOUT'});
    
    
    
  }
  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between">
      <Link to="/" exact>
        <Navbar.Brand>
          <img
            src={logo}
            width="50 px"
            height="50 px"
            className="d-inline-block align-top brand"
            alt="logo"
          />
          <span className="brand">{"  "}Virtual Labs</span>
        </Navbar.Brand>
      </Link>
      <Nav>
        <Nav.Link>
          <Link to="/" exact>
            Home
          </Link>
        </Nav.Link>

        <Nav.Link>
          <Link to="/">Lab</Link>
        </Nav.Link>
        {userData.authData !== null ? (
          <Nav.Link onClick = {logoutHandler}>
              Logout
            </Nav.Link>
        ) : (
          <NavDropdown title="Sign-in" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/auth" exact>
                Student
              </Link>
            </NavDropdown.Item>

            <NavDropdown.Item>
              <Link to="/auth" exact>
                Faculty
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </Nav>
    </Navbar>
  );
}

export default NavHead;
