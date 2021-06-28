import React , {useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "./icon.png";

import "./nav.css";

function NavHead() {
  const dispatch = useDispatch();
  
  const location = useLocation();
  
  const [userData, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  
  useEffect(() => {
      setUser(JSON.parse(localStorage.getItem("profile")))
    
  },[location])

  const logoutHandler = () => {
    dispatch({type : 'LOGOUT'});
    setUser(null);

    
    
    
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
        {userData ? (
          <>
          <Nav.Link>
            <Link to = "/dashboard">Hello {userData.result.name}</Link>
          </Nav.Link>
          
          <Nav.Link onClick = {logoutHandler}>
              Logout
            </Nav.Link>
            </>
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
