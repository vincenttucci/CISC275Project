import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import NightMode from './NightMode'; // use wrapper for more modularity

interface AboutPageProps {
  navigateTo: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ navigateTo }) => {
  return (
    <NightMode>
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
        <h2>About Career Helpi:</h2>
        <p>
          For some individuals, figuring out what type of career to pursue is a challenge. 
          The Career Helpi is dedicated to helping individuals of all ages gain insight into what career best fits them.
          Our goal is to help you make more informed decisions about where to take your career based on your skills and interests.
        </p>

        <h3>About Us</h3>
        <p>
          The Career Helpi was founded in 2025 by a team of students at the University of Delaware who recognized the need
          for more personalized career planning services.
        </p>

        <h3>How to Use our Website:</h3>
        <p>
          Once you enter your Chat GPT API key, you can proceed to the quizzes. Completing all of the Questions
          will allow you to proceed to the results page output, where Chat GPT will generate a report for you with
          careers that best fit your responses.
        </p>
      </Container>
    </NightMode>
  );
};

export default AboutPage;
