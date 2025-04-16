import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NightMode from './NightMode'; // New night mode code

type HomePageProps = {
  navigateTo: (page: string) => void;
};

const saveKeyData = "MYKEY";
let keyData = "";

const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  const [key, setKey] = useState<string>(keyData);
  const [nightMode, setNightMode] = useState<boolean>(localStorage.getItem("nightMode") === "true");

  const handleSubmit = () => {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
  };

  const changeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  const nightModeButton = () => {
    const newMode = !nightMode;
    setNightMode(newMode);
    localStorage.setItem("nightMode", String(newMode));
  };

  return (
    <NightMode>
      <Navbar className='backdrop-blur' expand="lg">
        <Container>
          <Navbar.Brand href="#">Career Helpi</Navbar.Brand>
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

      <header className="page-header text-center p-4">
        <h2>Welcome to Career Helpi!</h2>
        <p>Your journey to discovering your future starts here.</p>
      </header>

      <main className='App-main py-4'>
        <Container>
          <Row className="justify-content-center">
            <Col md={5} className="text-center mb-3">
              <div className='quiz-box'>
                <Button
                  variant="outline-dark"
                  className="mb-2"
                  onClick={() => {
                    if (!key) {
                      alert("Please enter your API key before starting the quiz.");
                      return;
                    }
                    navigateTo("basicQuestion");
                  }}
                >
                  Basic Questions
                </Button>
                <p>An easier quiz for students with less time that contains only multiple choice questions.</p>
              </div>
            </Col>

            <Col md={5} className="text-center mb-3">
              <div className='quiz-box'>
                <Button
                  variant="outline-dark"
                  className="mb-2"
                  onClick={() => {
                    if (!key) {
                      alert("Please enter your API key before starting the quiz.");
                      return;
                    }
                    navigateTo("detailedquiz");
                  }}
                >
                  Detailed Questions
                </Button>
                <p>A longer, more comprehensive quiz for students who want a more detailed response.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      <footer className="App-footer" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <Form style={{ width: "100%", maxWidth: "400px" }}>
          <Form.Label style={{ fontSize: "small" }}>API Key:</Form.Label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Form.Control
              type="text"
              placeholder="Insert API Key Here"
              value={key}
              onChange={changeKey}
            />
            <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
          </div>
        </Form>

        <div className="night-toggle" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px', textAlign: "right", fontSize: "13px" }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '1.2rem' }}>
              {nightMode ? '🌙' : '☀️'}
            </span>
            <Form.Check
              type="switch"
              id="night-mode-switch"
              checked={nightMode}
              onChange={nightModeButton}
            />
          </div>
          <p className="footer-text mt-2 mb-0">
            Vincent Tucci, Brooklyn Harden,<br />
            Taylor Jenkins, Sam Mullaney<br />
          </p>
        </div>
      </footer>
    </NightMode>
  );
};

export default HomePage;
// end of homepage code
