import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Footer.css";

function MyFooter() {
  return (
    <footer style={{ backgroundColor: "#161a1e", color: "#fbfbfb", padding: "20px 0" }}>
      <Container>
        <Row className="text-center text-md-left">
          <Col md={4} className="mb-3 mb-md-0">
            <h5 style={{ color: "#e58e27" }}>About Us</h5>
            <p style={{ color: "#9a9a9a" }}>
              We are a leading e-commerce platform for video games. Our mission is to provide the best gaming experience
              with a wide selection of games and top-notch customer service.
            </p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5 style={{ color: "#e58e27" }}>Follow Us</h5>
            <div className="d-flex justify-content-center ">
              <a href="https://facebook.com" className="text-white me-3" style={{ fontSize: "24px" }}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" className="text-white me-3" style={{ fontSize: "24px" }}>
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://twitter.com" className="text-white me-3" style={{ fontSize: "24px" }}>
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://discord.com" className="text-white" style={{ fontSize: "24px" }}>
                <i className="bi bi-discord"></i>
              </a>
            </div>
          </Col>
          <Col md={4}>
            <h5 style={{ color: "#e58e27" }}>Payment Methods</h5>
            <div className="d-flex justify-content-center ">
              <i className="bi bi-paypal me-3" style={{ fontSize: "24px", color: "#9a9a9a" }}></i>
              <i className="bi bi-credit-card-2-front me-3" style={{ fontSize: "24px", color: "#9a9a9a" }}></i>
              <i className="bi bi-credit-card me-3" style={{ fontSize: "24px", color: "#9a9a9a" }}></i>
              <i className="bi bi-credit-card-2-back me-3" style={{ fontSize: "24px", color: "#9a9a9a" }}></i>
            </div>
          </Col>
        </Row>
        <hr style={{ borderColor: "#9a9a9a" }} />
        <Row>
          <Col className="text-center">
            <p style={{ color: "#9a9a9a" }}>© 2024 Your Video Game Store. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default MyFooter;
