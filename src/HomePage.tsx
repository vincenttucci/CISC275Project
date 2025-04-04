import React, {useState} from 'react';
import { Navbar, Nav, Container, Form, Button, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';




type HomePageProps = {navigateTo: (page: string) => void;

};

/*Keys used for storing and retrieving our API key*/
const saveKeyData = "MYKEY";
let keyData = "";

const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

const HomePage: React.FC<HomePageProps> = ({navigateTo})=> {
  //Keeps track of the API Key
    const [key, setKey] = useState<string>(keyData);
  //Keeps track whether the night mode is off or on
    const [nightMode, setNightMode] = useState<boolean>(false);

  /*Saves API key to local storage and reloads page*/
    const handleSubmit = () => {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload();
      };



const changeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  /*Toggles night mode on/off*/
  const nightModeButton = () => {
    setNightMode(!nightMode);
  };

  return (
    /* 
    This wrapper contains the entire app's layout and switches
    background images depending on if the nightmode is on or off 
    */
    <div className={`App-wrapper ${nightMode ? 'night-mode' : ''}`}
    style={{
      backgroundImage: nightMode ? 'url("/darkBG1.jpeg")' : 'url("/pinkBG.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      position: 'relative',
      zIndex: 1
    }}>

<div className="overlay"></div>


       {/* Navigation Bar */}
       <Navbar className='backdrop-blur' expand="lg">
        <Container>
          <Navbar.Brand href="#">Career Finder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={(e) => {e.preventDefault(); navigateTo("home");}}>Home</Nav.Link>
              <Nav.Link href="#" onClick={(e) => {e.preventDefault(); navigateTo("contact");}}>Contact</Nav.Link>
              <Nav.Link href="#" onClick={(e) => {e.preventDefault(); navigateTo("about");}}>About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


        {/* Header Message */}
        <header className="page-header text-center p-4">
            <h2>Welcome to Career Finder!</h2>
            <p>Your journey to discovering your future starts here.</p>
        </header>


        {/* Main Content - Buttons to start the quizzes*/}
      <main className='App-main py-4'>
        <Container>
          <Row className="justify-content-center">

            {/* Left Side - Basic Question */}
            <Col md={5} className="text-center mb-3">
            <div className='quiz-box'>
            <Button variant="outline-dark" className="mb-2" onClick={() => navigateTo("basicQuestion")}>
              Basic Questions
            </Button>
              <p>An easier quiz for students with less time</p>
              </div>
            </Col>

            {/* Right Side - Detailed Questions */}
            <Col md={5} className="text-center mb-3">
            <div className='quiz-box'>
              <Button variant="outline-dark" className="mb-2" onClick={()=> navigateTo("detailedquiz")}>
                Detailed Questions
              </Button>
              <p>A more comprehensive quiz for students who want a more detailed response</p>
              </div>
            </Col>

          </Row>
        </Container>
    </main>


        {/* Footer Sectio */}
      <footer className="App-footer" style = {{display:'flex', justifyContent:'space-between', padding:'20px'}}>

       {/* Left: Form - API Key Input */}
        <Form style={{width: "220px"}}>
            <Form.Label style={{ fontSize: "small"}}>API Key:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Insert API Key Here"
              onChange={changeKey}
            />
            <br />
            <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
          </Form>

         {/* Right - Toggle & Credits */}
         <div className= "night-toggle" style={{ textAlign: "right", fontSize: "13px"}}>
          <span style={{fontSize: '1.2rem'}}>
            {nightMode ? '🌙' : '☀️' }
          </span>
             <Form.Check
                type="switch"
                id="nigth-mode-switch"
                // label="Night Mode"
                checked={nightMode}
                onChange={nightModeButton}
              />
        <p className="footer-text mt-2 mb-0"> 
            Copyright &copy; 2025 <br/>
            Vincent Tucci<br/>
            Brooklyn Harden<br/>
            Taylor Jenkins<br/>
            Sam Mullaney
            </p>
        </div>
      </footer>
    </div>
  );
}

   

export default HomePage;




 
  