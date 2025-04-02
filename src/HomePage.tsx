import React, {useState} from 'react';
import { Navbar, Nav, Container, Form, Button, Row, Col} from 'react-bootstrap';
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
          <Navbar.Brand href="#">
          {/* <img
            src="/o.png"
            alt="Logo"
            height="40"
            className="d-inline-block align-top me-2"/> */}
        Career Finder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={(e) => {e.preventDefault(); navigateTo("home");}}>Home</Nav.Link>
              <Nav.Link href="#" onClick={(e) => {e.preventDefault(); navigateTo("contact");}}>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


        {/* Page Header / Hero Section */}
        <header className="page-header text-center p-4" style={{ backgroundColor: "#f0f8ff" }}>
            <h2>Welcome to Career Finder!</h2>
            <p>Your journey to discovering your future starts here.</p>
        </header>


        {/* Main Content */}
      <main className='App-main py-4'>

                     {/* className='Home-buttons */}
        <Container>
          <Row className="justify-content-center">
            <Col md={5} className="text-center mb-3">
              <Button variant="outline-dark" className="mb-2">Basic Questions</Button>
              <p>An easier quiz for students with less time</p>
            </Col>
            <Col md={5} className="text-center mb-3">
              <Button variant="outline-dark" className="mb-2">Detailed Questions</Button>
              <p>A more comprehensive quiz for students who want a more detailed response</p>
            </Col>
          </Row>
        </Container>
    </main>


        {/*Footer*/}
      <footer className="App-footer" style = {{display:'flex', justifyContent:'space-between', padding:'20px'}}>

       {/*Left: Form*/}
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

         {/*Right: Toggle & Credits*/}
         <div style={{ textAlign: "right", fontSize: "13px"}}>
             <Button size= "sm" onClick={nightModeButton}>Toggle Night Mode</Button>

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




 
  