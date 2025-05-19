import React, { useState } from 'react';
import { Container, Navbar, Nav, Form } from 'react-bootstrap';
import SwitchModeWrapper from './SwitchMode'; // use wrapper for more modularity

interface AboutPageProps {
  navigateTo: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ navigateTo }) => {
  const [switchMode, setSwitchMode] = useState<boolean>(localStorage.getItem("nightMode") === "true");//to switch between beach and mc mode
     const switchModeButton = () => {
      const newMode = !switchMode;
      setSwitchMode(newMode);
      localStorage.setItem("switchMode", String(newMode));
     }
  return (
    //connects page to other pages with navbar and connects page to switchmode with "page=about". Switchmode toggle and emojis included
    <SwitchModeWrapper page="about">
      <Navbar className='backdrop-blur' expand="lg">
        <Container>
          <Navbar.Brand href="#">The Career Lagoon</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("home"); }}>Home</Nav.Link>
              <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("contact"); }}>Contact</Nav.Link>
              <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("about"); }}>About</Nav.Link>
            </Nav>
            <div className="mode-toggle" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px', textAlign: "right", fontSize: "13px" }}>
                                                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                        <span style={{ fontSize: '1.2rem' }}>
                                                          {switchMode ? '🏹' : '🏖️'}
                                                        </span>
                                                        <Form.Check
                                                          type="switch"
                                                          id="mode-switch"
                                                          checked={switchMode}
                                                          onChange={switchModeButton}
                                                        />
                                                      </div>
                                                      </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
      <div className={"about-box"}>
        <h2>About Career Lagoon:</h2>
        <p>
          For some individuals, figuring out what type of career to pursue is a challenge. 
          The Career Lagoon is dedicated to helping individuals of all ages gain insight into what career best fits them.
          Our goal is to help you make more informed decisions about where to take your career based on your skills and interests.
        </p>

        <h3>About Us</h3>
        <p>
          The Career Lagoon was founded in 2025 by a team of students at the University of Delaware who recognized the need
          for more personalized career planning services. The website is designed to provide users of all brackgrounds with
          a fun and engaging way to explore potential career paths.
        </p>

        <h3>How to Use our Website:</h3>
        <p>
          Once you enter your Chat GPT API key, you can proceed to the quizzes. Completing all of the Questions
          will allow you to proceed to the results page output, where Chat GPT will generate a report for you with
          careers that best fit your responses. Clicking on the respective starfish buttons allows you to proceed 
          to the next question and return to the previous question.
        </p>
        </div>
      </Container>
    </SwitchModeWrapper>
  );
};

export default AboutPage;
