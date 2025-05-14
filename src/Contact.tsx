import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, Button, Modal } from 'react-bootstrap';
import SwitchModeWrapper from './SwitchMode';
import ReactConfetti from 'react-confetti';
interface ContactPageProps {
  navigateTo: (page: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ navigateTo }) => {
  const [name, setName] = useState(''); //keeps track of name entered
  const [email, setEmail] = useState(''); //keeps track of email entered
  const [message, setMessage] = useState(''); //keeps track of message entered
  const [showModal, setShowModal]=useState(false);//for submission modal
   const [switchMode, setSwitchMode] = useState<boolean>(localStorage.getItem("switchMode") === "true");//to switch between beach and mc mode
   const handleSubmit= (e: React.FormEvent)=> {//handles contact submission and updates fields using state
    e.preventDefault();

    const contactFormData= new FormData();
    contactFormData.append("entry.2032660616", name);
    contactFormData.append("entry.1328533756", email);
    contactFormData.append("entry.1101419626", message);
    fetch("https://docs.google.com/forms/d/e/1FAIpQLSdVNLSw4MAY9U4YcijqqzQ3Gic_Z9nx-rLTzMG9VRoKhF1awg/formResponse", {
      method: "POST",
      mode: "no-cors", // required to avoid CORS errors with Google Forms
      body: contactFormData,
    }).then(() => {
    //https://docs.google.com/forms/d/e/1FAIpQLSdVNLSw4MAY9U4YcijqqzQ3Gic_Z9nx-rLTzMG9VRoKhF1awg/viewform?usp=pp_url&entry.2032660616=Name&entry.1328533756=Email&entry.1101419626=Message
    setShowModal(true);
    setEmail('');
    setMessage('');
    setName('');
   }).catch((error)=> {
    console.error("google submission failed", error);
   });
   };
   const switchModeButton = () => {//to switch between beach and mc mode
    const newMode = !switchMode;
    setSwitchMode(newMode);
    localStorage.setItem("switchMode", String(newMode));
  };
  return (
    <>
    <SwitchModeWrapper page="contact">
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
        <Form onSubmit={handleSubmit}> 
        {/* handles contact submission and updates feilds using state  */}
          <Form.Group className='mb-3' controlId='userName'>
            {/* controls name textbox */}
            <Form.Label>Name:</Form.Label>
            <Form.Control 
            type='text' 
            placeholder='Enter Your Name Here'
            value={name}
            onChange={(e)=>setName(e.target.value)} />
          </Form.Group>
          {/* controls email textbox */}
          <Form.Group className='mb-3' controlId='userEmail'>
          <Form.Label>Email Address:</Form.Label>
          <Form.Control 
          type='email' 
          placeholder='Enter Your Email Here'
          value={email}
          onChange={(e)=> setEmail(e.target.value)} />
          </Form.Group>
          {/* controls message textbox and has more rows to provide more room */}
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
