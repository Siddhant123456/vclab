import React , {useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
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
      <NavLink to="/" exact>
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
      </NavLink>
      <Nav>
        <Nav.Link>
          <NavLink to="/" exact activeClassName = "activeNav" style = {{color : 'silver',textDecoration : 'none'}}>
            Home
          </NavLink>
        </Nav.Link>

        <Nav.Link>
          <NavLink to="/lab" activeClassName = "activeNav" style = {{color : 'silver',textDecoration : 'none'}}>Lab</NavLink>
        </Nav.Link>
        {userData ? (
          <>
          <Nav.Link>
            <NavLink to = "/dashboard" activeClassName = "activeNav" style = {{color : 'silver' ,textDecoration : 'none'}}>Dashboard</NavLink>
          </Nav.Link>
          
          <Nav.Link onClick = {logoutHandler} style = {{color : 'silver' , textDecoration : 'none'}}>
              Logout
            </Nav.Link>
            </>
        ) : (
          <Nav.Link>
              <NavLink to = "/auth" activeClassName = "activeNav" style = {{color : 'silver',textDecoration : 'none'}}>SignIn/SignUp</NavLink>

          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
}

export default NavHead;
