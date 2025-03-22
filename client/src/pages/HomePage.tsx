import NavBar from "../components/NavBar";
import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <Container
        className="d-flex justify-content-center align-items-center"
        fluid
      >
        <button
          className="btn bg-secondary fw-bold fs-5 px-5 py-4 mt-5"
          onClick={() => navigate("/login")}
        >
          Upload
        </button>
      </Container>
    </>
  );
}

export default HomePage;
