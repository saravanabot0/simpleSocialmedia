import {React, useState} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FaUser } from "react-icons/fa";
import {authentication} from "../../firebaseConfig/firebaseConfig"
import { onAuthStateChanged, signOut  } from "firebase/auth";
import { Link } from "react-router-dom";

import "./header.css";

function Header(props) {



  const userSigningOut = () => {
    // firebase.auth().signOut();
    signOut(authentication).then(() => {
      // Sign-out successful.
      console.log(" Sign-out successful");
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }

  return (
    <>
      <Navbar bg="dark" className="p-3">
        <Container>
          <Navbar.Brand href="#home" className="textWhiteColor"> <h3> Share Your Thoughts </h3> </Navbar.Brand>
          <DropdownButton id="dropdown-basic-button" drop="down" title={<span> <FaUser size={25}/> <i className="userName"> {props.loginStatus? props.userDetails?.displayName : "Guest" } </i> </span>}>
            <Dropdown.Item href="#/action-1"> Edit Profile </Dropdown.Item>
            <Dropdown.Item href="#/action-2"> Create Post </Dropdown.Item>
            <Dropdown.Divider />
            {props.loginStatus ? <Dropdown.Item eventKey="4" onClick={()=> userSigningOut()}> LogOut </Dropdown.Item> :
            <Dropdown.Item > <Link to="/login" className="w-100 text-dark">  LogIn   </Link></Dropdown.Item>}
          </DropdownButton>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
