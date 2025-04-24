import React from 'react';
import { Container, ProgressBar, Form, Navbar, Nav, Button, Modal} from 'react-bootstrap';


export interface QuizQuestion {
    id: number;
    body: string;
    options: string[];
}


let basicQuestions: QuizQuestion[] = [
    { id: 1, body: 'Do you enjoy problem-solving?', options: ['Yes, a lot!', 'Sometimes', 'Not really'] },
    { id: 2, body: 'Do you like working with people?', options: ['Yes', 'Occasionally', 'I prefer working alone'] },
    { id: 3, body: 'Do you prefer working with numbers or words?', options: ['Numbers', 'Words', 'Both equally'] },
    { id: 4, body: 'Would you rather work indoors or outdoors?', options: ['Indoors', 'Outdoors', 'No preference'] },
    { id: 5, body: 'Do you enjoy creative tasks?', options: ['Yes', 'Sometimes', 'Not really'] }
];

interface BasicQuizProps {
    navigateTo: (page: string) => void;
}

let BasicQuiz: React.FC<BasicQuizProps> = ({ navigateTo }) => {
    let [choice, setChoice] = React.useState<{ [key: number]: string }>({});
    /*
    Hey Sam, I(brooklyn) added this useState to show a popup modal that appears
    when the user clicks the Submit button, telling them they have Completion
    the quiz and can now move on to the results page to see their results

    You can take this out or change anything but yeah, its the code below
    let[showModal....]
     */
    let [showModal, setShowModal] = React.useState(false);
    let [currentIndex, setCurrentIndex] = React.useState(0);

    let currentQuestion = basicQuestions[currentIndex];

    let trackChoices = (id: number, option: string) => {
        setChoice({ ...choice, [id]: option });
    };

    const nextButton = () => {
        if(currentIndex < basicQuestions.length -1){
            setCurrentIndex(currentIndex + 1);
        }
    };

    const previousButton = () => {
        if(currentIndex > 0 ){
            setCurrentIndex(currentIndex - 1);
        }
    };

    const submitButton = () => {
        setShowModal(true);
    };

    return (
        <div
        className="basic-quiz-page"
        style={{
            backgroundImage: 'url("/pink.gif")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100%',
            width: '100%'
        }}
        >
            {/* Navbar (copied from HomePage.tsx) */}
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

        {/* Left Arrow */}
        <div 
            className='arrow left-Arrow'
            onClick={currentIndex > 0 ? previousButton : undefined}
            style = {{ opacity: currentIndex === 0 ? 0.4 : 1}}
            >
                 ←
            </div>

         {/* Right Arrow */}
         <div 
            className='arrow right-Arrow'
            onClick={choice[currentQuestion.id] ? nextButton : undefined}
            style = {{ opacity: currentIndex === basicQuestions.length - 1 || !choice[currentQuestion.id] ? 0.4 : 1}}
            >
                 →
            </div>
        

        {/*Quiz Card*/}
        <Container className='d-flex justify-content-center align-items-center'style={{minHeight: '100vh'}}>
            <div className='quiz-card p-4 rounded shadow' style={{ maxWidth: '600px', width: '100%' }}>
             <h5 className="mb-4">Question {currentIndex + 1} of {basicQuestions.length}</h5>

            {/* Quiz Content */}
            <ProgressBar now={((currentIndex + 1) / basicQuestions.length) * 100} />

            {/* <Container className='py-4'> */}
                <Form>
                        <Form.Group controlId={`question-${currentQuestion.id}`} className='basicquestion'>
                            <Form.Label>{currentQuestion.body}</Form.Label>
                            {currentQuestion.options.map((option, index) => (
                                <Form.Check
                                    key={index}
                                    type="radio"
                                    id={`question-${currentQuestion.id}-option-${index}`} //fixes error of only selecting first choice on text click
                                    label={option}
                                    name={`question-${currentQuestion.id}`}
                                    value={option}
                                    checked={choice[currentQuestion.id] === option}
                                    onChange={() => trackChoices(currentQuestion.id, option)}
                                />
                            ))}
                        </Form.Group>
                </Form>

       
            {currentIndex === basicQuestions.length - 1 && (
            <div className="d-flex justify-content-end mt-4">
                    <Button className='submitButton' 
                        onClick={submitButton}
                        disabled={!choice[currentQuestion.id]}
                        > Submit
                    </Button> 
            </div>
              )}
        </div>
    </Container>

        {/* Completed Modal*/}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
            <Modal.Title>Quiz Completed!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                Great Job completing the quiz. Click below to see your results!
        </Modal.Body>
        <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowModal(false)}>Close</Button>
            <Button variant='primary' onClick={() => {localStorage.setItem("quizAnswers", JSON.stringify(choice)); navigateTo("result")}}>View Results</Button>
        </Modal.Footer>
        </Modal>
        </div>
    );
};

export default BasicQuiz;
                                                                 