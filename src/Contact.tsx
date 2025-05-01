import React, { useState } from 'react';
import { Container, Navbar, Nav, Form } from 'react-bootstrap';
import NightMode from './NightMode';
interface ContactPageProps {
  navigateTo: (page: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ navigateTo }) => {
   const [nightMode, setNightMode] = useState<boolean>(localStorage.getItem("nightMode") === "true");
   const nightModeButton = () => {
    const newMode = !nightMode;
    setNightMode(newMode);
    localStorage.setItem("nightMode", String(newMode));
  };
  return (
    <>
    <NightMode page="contact">
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
             <div className="night-toggle" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px', textAlign: "right", fontSize: "13px" }}>
                                                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                        <span style={{ fontSize: '1.2rem' }}>
                                                          {nightMode ? '🏹' : '☀️'}
                                                        </span>
                                                        <Form.Check
                                                          type="switch"
                                                          id="night-mode-switch"
                                                          checked={nightMode}
                                                          onChange={nightModeButton}
                                                        />
                                                      </div>
                                                      </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <h2>Name:</h2>
        <h2>Email:</h2>
        <h2>Message:</h2>
      </Container>
      </NightMode>
    </>
  );
};

export default ContactPage;