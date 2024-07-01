import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { CiShoppingCart } from "react-icons/ci";
import "../styles/Sidebar.css"; // Assicurati di importare il tuo stile CSS per la sidebar

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </button>
      <Navbar expand="lg">
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/store">
            Game Store
          </Nav.Link>
          <Nav.Link as={Link} to="/library">
            Your Library
          </Nav.Link>
          <Nav.Link as={Link} to="/mycart">
            <CiShoppingCart style={{ fontSize: "30px", color: "grey" }} />
            <span className="cart-badge">3</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
          <Nav.Link as={Link} to="/register">
            Register
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Sidebar;
