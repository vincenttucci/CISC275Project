import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SwitchModeWrapper from './SwitchMode';


//Props: Function that lets us switch pages (like going to the quiz)
type HomePageProps = {
  navigateTo: (page: string) => void;
};

//Key used to store API key in local Storage
const saveKeyData = "MYKEY";
let keyData = "";

//If a key is already saved in localStorage, use it to prefill th field 
const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  const [key, setKey] = useState<string>(keyData); //Tracks API key input
  const [switchMode, setSwitchMode] = useState<boolean>(localStorage.getItem("switchMode") === "true"); //Minecraft or Beach mode switch
  const [loading, setLoading] = useState<boolean>(false); //Shows spinner while checking API key 
  const [successMessage, setSuccessMessage] = useState<boolean>(false); //Shows sucess banner 

  // reference: https://platform.openai.com/docs/api-reference/authentication
  //Checks if entered API key is valid by calling OPENAI's model endpoint 
  const validateApiKey = async (apiKey: string): Promise<boolean> => {
    try {
      const response = await fetch("https://api.openai.com/v1/models", {
        headers: {
          "Authorization": `Bearer ${apiKey}`
        }
      });

      return response.status === 200;
    } catch (error) {
      console.error("Error validating API key:", error);
      return false;
    }
  };

  //When use clicks 'Submit' to save their API key
  const handleSubmit = async () => {
    setLoading(true);
    const isValid = await validateApiKey(key);
    setLoading(false);

    if (isValid) {
      localStorage.setItem(saveKeyData, JSON.stringify(key)); //Save to browser memory
      setSuccessMessage(true);

      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000); //Hide message after 3 seconds
    } else {
      alert("Invalid API Key. Please enter a valid key.");
    }
  };

  //Updates local state as user types their API key
  const changeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  //Toggles between beach and minecraft mode 
  const switchModeButton = () => {
    const newMode = !switchMode;
    setSwitchMode(newMode);
    localStorage.setItem("switchMode", String(newMode));
  };

  return (
    <SwitchModeWrapper page="home">
      <Navbar className='backdrop-blur' expand="lg">
        <Container>
          <Navbar.Brand href="#">The Career Lagoon</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("home"); }}>Home</Nav.Link>
              <Nav.Link href="#" onClick={(e) => { e.preventDefault(); navigateTo("contact");}}>Contact</Nav.Link>
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

      {/* Main page header*/}
      <header className="page-header text-center p-4">
        <h2>Welcome to The Career Lagoon!</h2>
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
                  // makes sure API key is valid before the user can start basic quiz, throws alert if not
                  onClick={async () => {
                    if (!key) {
                      alert("Please enter your API key before starting the quiz.");
                      return;
                    }
                    const isValid = await validateApiKey(key);
                    if (!isValid) {
                      alert("Invalid API key. Please enter a valid key before proceeding.");
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
                  // verifies API key for detailed quiz like basic question
                  onClick={async () => {
                    if (!key) {
                      alert("Please enter your API key before starting the quiz.");
                      return;
                    }
                    const isValid = await validateApiKey(key);
                    if (!isValid) {
                      alert("Invalid API key. Please enter a valid key before proceeding.");
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
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', position: 'relative' }}>
            <Form.Control
              type="password"
              placeholder="Insert API Key Here"
              value={key}
              onChange={changeKey}
            />
            <Button 
              className="Submit-Button" 
              onClick={handleSubmit} 
              disabled={loading}
              style={{ width: "150px", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}
              >
                {loading && <Spinner animation="border" size="sm" />}
                <span style={{ visibility: loading ? "visible" : "visible" }}>
                {loading ? "Checking..." : "Submit"}
              </span>
            </Button>


            {successMessage && (
              <Alert variant="success" style={{
                position: 'absolute',
                top: '-50px',
                left: '0',
                right: '0',
                textAlign: 'center',
                fontSize: '14px',
                padding: '5px'
              }}>
                API Key saved successfully!
              </Alert>
            )}
          </div>
        </Form>
          <p className="footer-text mt-2 mb-0">
            Vincent Tucci, Brooklyn Harden,<br />
            Taylor Jenkins, Sam Mullaney<br />
          </p>
        {/* </div> */}
      </footer>
    </SwitchModeWrapper>
  );
};

export default HomePage;
// end of homepage code.