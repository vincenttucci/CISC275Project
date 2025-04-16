import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

interface ResultPageProps {
  navigateTo: (page: string) => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ navigateTo }) => {
  return (
    <>
      <Navbar className='backdrop-blur' expand="lg">
        <Container>
          <Navbar.Brand href="#">Career Finder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("home"); }}>Home</Nav.Link>
              <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("contact"); }}>Contact</Nav.Link>
              <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("about"); }}>About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <h1>Congradulations!</h1><br/>
          <p>You finished the quiz, read below to see your Quiz Results.</p><br/>
        <h2>Quiz Results: </h2>
      </Container>
    </>
  );
};

export default ResultPage;

