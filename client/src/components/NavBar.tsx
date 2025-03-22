import React from "react";
import "../styles/bootstyles.scss";
import { Container, Row, Col } from "react-bootstrap/";

function NavBar() {
  var user = undefined;

  return (
    <>
      <Container
        className="bg-light px-3 py-3 d-flex justify-content-between align-items-center"
        fluid
      >
        <div className="text-center d-inline-block mx-auto fs-4 fw-bold">
          <span style={{ color: "orange" }}>Photo</span>
          <span style={{ color: "black" }}>Hub</span>
        </div>
        <div className="btn bg-secondary" style={{ backgroundColor: "orange" }}>
          {!user ? "Login" : "Logout"}
        </div>
      </Container>
    </>
  );
}

export default NavBar;
