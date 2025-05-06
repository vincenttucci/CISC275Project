import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, Button, Modal } from 'react-bootstrap';
import SwitchModeWrapper from './SwitchMode';
import ReactConfetti from 'react-confetti';
interface ContactPageProps {
  navigateTo: (page: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ navigateTo }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal]=useState(false);
   const [switchMode, setSwitchMode] = useState<boolean>(localStorage.getItem("switchMode") === "true");
   const handleSubmit= (e: React.FormEvent)=> {
    e.preventDefault();
    setShowModal(true);
    setEmail('');
    setMessage('');
    setName('');
   }
   const switchModeButton = () => {
    const newMode = !switchMode;
    setSwitchMode(newMode);
    localStorage.setItem("switchMode", String(newMode));
  };
  return (
    <>
    <SwitchModeWrapper page="contact">
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
             <div className="mode-toggle" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px', textAlign: "right", fontSize: "13px" }}>
                                                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                        <span style={{ fontSize: '1.2rem' }}>
                                                          {switchMode ? '🏹' : '☀️'}
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
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='userName'>
            <Form.Label>Name:</Form.Label>
            <Form.Control 
            type='text' 
            placeholder='Enter Your Name Here'
            value={name}
            onChange={(e)=>setName(e.target.value)} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='userEmail'>
          <Form.Label>Email Address:</Form.Label>
          <Form.Control 
          type='email' 
          placeholder='Enter Your Email Here'
          value={email}
          onChange={(e)=> setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='userMessage'>
          <Form.Label>Message:</Form.Label>
          <Form.Control 
          as='textarea' 
          rows={5} 
          placeholder='Enter Your Message Here' 
          value={message}
          onChange={(e)=>setMessage(e.target.value)}/>
          </Form.Group>
          <Button className='primary' type='submit'> Submit</Button>
        {/* <h2>Name:</h2>
        <h2>Email:</h2>
        <h2>Message:</h2> */}
        </Form>
      </Container>
       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                   {showModal && <ReactConfetti />}
                          <Modal.Header closeButton>
                              <Modal.Title>Message Sent!</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                                  Thank you for your feedback!
                          </Modal.Body>
                          <Modal.Footer>
                              <Button variant='primary' onClick={() => setShowModal(false)}>Close</Button>
                          </Modal.Footer>
                          </Modal>
      </SwitchModeWrapper>
    </>
  );
};

export default ContactPage;