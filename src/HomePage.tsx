import React, {useState} from 'react';
import { Navbar, Nav, Container, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type HomePageProps = {navigateTo: (page: string) => void;

};

const saveKeyData = "MYKEY";
let keyData = "";

const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

const HomePage: React.FC<HomePageProps> = ({navigateTo})=> {
    const [key, setKey] = useState<string>(keyData);
    const [nightMode, setNightMode] = useState<boolean>(false);

    const handleSubmit = () => {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload();
      };



const changeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  const nightModeButton = () => {
    setNightMode(!nightMode);
  };

  return (
    <div className={`App-wrapper ${nightMode ? 'night-mode' : ''}`}>
       {/* Navigation Bar */}
       <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Career Finder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={(e) => {e.preventDefault(); navigateTo("home");}}>Home</Nav.Link>
              <Nav.Link href="#" onClick={(e) => {e.preventDefault(); navigateTo("contact");}}>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

        {/* Main Content */}
        <div className='App'>
        <header className="App-header">
        </header>


        <div className="question-buttons">
          <button className='Basic-Questions'>Basic Questions</button>
          <p>A more comprehensive quiz for students who want a more detailed response</p>

          <button className='Detailed-Questions'>Detailed Questions</button>
          <p>An easier quiz for students with less time</p>
        </div>
      </div>

      <footer className="App-footer">
        <div className="footer-left">
          <Button variant="secondary" onClick={nightModeButton}>Toggle Night Mode</Button>
        </div>

        <div className="footer-center">
          <Form.Control
            type="text"
            placeholder="Insert API Key Here"
            value={key}
            onChange={changeKey}
            className="footer-key"/>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </div>

      <div className="footer-right">
        <p className="footer-names">© 2025 Vincent Tucci, Brooklyn Harden, Taylor Jenkins, Sam Mullaney</p>
      </div>
      </footer>
    </div>
  );
}

   

export default HomePage;




 
  