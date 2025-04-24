

import React, {useState} from 'react';
import { Container, ProgressBar, Form, Navbar, Nav, Button, Modal} from 'react-bootstrap';


export interface QuizQuestion {
    id: number;
    body: string;
    options?: string[];
    //for questions that require textarea
    isOpenEnded?: boolean;
    //for select all that apply questions
    isSelectAll?:boolean;
}


let basicQuestions: QuizQuestion[] = [
    { id: 1, body: 'Do you enjoy problem-solving?', options: ['Yes, a lot!', 'Sometimes', 'Not really'] },
    { id: 2, body: 'Do you like working with people?', options: ['Yes', 'Occasionally', 'I prefer working alone'] },
    { id: 3, body: 'Which of these skills do you feel strongest in? (Select all that apply)', options: ['Creativity', 'Leadership', 'Technical skills', 'Empathy'], isSelectAll: true },
    { id: 4, body: 'Do you prefer working with numbers or words?', options: ['Numbers', 'Words', 'Both equally'] },
    { id: 5, body: 'Would you rather work indoors or outdoors?', options: ['Indoors', 'Outdoors', 'No preference'] },
    { id: 6, body: 'Do you enjoy creative tasks?', options: ['Yes', 'Sometimes', 'Not really'] },
    { id: 7, body: 'Which of these activities do you enjoy? (Select all that apply)', options: ['Reading', 'Traveling', 'Gaming', 'Cooking'], isSelectAll: true },
];

interface BasicQuizProps {
    navigateTo: (page: string) => void;
}

let BasicQuiz: React.FC<BasicQuizProps> = ({ navigateTo }) => {
   let [choice,setChoice]=useState<{ [key:number]:string | string[]}>({});
    /*
    Hey Sam, I(brooklyn) added this useState to show a popup modal that appears
    when the user clicks the Submit button, telling them they have Completion
    the quiz and can now move on to the results page to see their results

    You can take this out or change anything but yeah, its the code below
    let[showModal....]
     */
    let [showModal, setShowModal] = React.useState(false);

    let trackChoices = (id: number, option: string|string[]) => {
        setChoice({ ...choice, [id]: option });
    };
//counting number of answered question for the select all and opened ended questions
        //done for progress bar to update correctly
        let answerCount=basicQuestions.filter((question)=>{
            let answer=choice[question.id];
            if (question.isOpenEnded) return typeof answer === 'string' && answer.trim() !== '';
            if (question.isSelectAll) return Array.isArray(answer) && answer.length > 0;
            return typeof answer === 'string' && answer !== '';
        }).length;
    return (
        <div
        className="basic-quiz-page"
        style={{
            backgroundImage: 'url("/bluebackground.jpg")',
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
{/* progress bar stays on screen while scrolling */}
            <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backgroundColor: 'white',
            padding: '0.5rem 1rem'
        }}>{/* updates bar */}
                {/* added stripes and animations for razzle dazzle */}
            <ProgressBar className='basicProgress' animated now={(answerCount/basicQuestions.length)*100} label={`${answerCount}/${basicQuestions.length}`}/>
            </div>
        {/*Quiz Card*/}
        <Container className='d-flex justify-content-center align-items-center'style={{minHeight: '100vh'}}>
            <div className='quiz-card p-4 rounded shadow bg-white' style={{ maxWidth: '600px', width: '100%' }}>
             <h5 className="mb-4">Quiz</h5>

            {/* Quiz Content
            <ProgressBar now={(Object.keys(choice).length / basicQuestions.length) * 100} label={`${Object.keys(choice).length}/${basicQuestions.length}`} /> */}

            {/* <Container className='py-4'> */}
                <Form>
                    {basicQuestions.map((question) => (
                        <Form.Group key={question.id} controlId={`question-${question.id}`} className='basicquestion'>
                            <Form.Label>{question.body}</Form.Label>
                             {question.isOpenEnded ? (
                                                                <Form.Control
                                                                as="textarea"
                                                                rows={3}
                                                                value={choice[question.id] ||''}
                                                                onChange={(e)=> trackChoices(question.id,e.target.value)}
                                                                placeholder='Answer Here'
                                                                />
                                                            ): question.isSelectAll ?(
                                                                question.options?.map((option,index) => (
                                                                    <Form.Check
                                                                    key={index}
                                                                    type='checkbox'
                                                                    id={`question-${question.id}-option-${index}`}
                                                                    label={option}
                                                                    name={`question-${question.id}`}
                                                                    value={option}
                                                                    checked={(choice[question.id]||[]).includes(option)}
                                                                    onChange={(e)=>{let currentChoice=choice[question.id]||[];
                                                                        if (e.target.checked) {
                                                                            trackChoices(question.id,[...(currentChoice as string[]),option]);
                                                                        }else {
                                                                            trackChoices(question.id,(currentChoice as string[]).filter((o:string)=> o!== option));
                                                                        }
                                                                    }}
                                                                    />
                                                                ))
                                                            ):(
                                                            question.options?.map((option,index)=>(
                                                                //handles the radio buttons
                                                                //reference-homework 10
                                                                <Form.Check
                                                                key={index}
                                                                type="radio"
                                                                id={`question-${question.id}-option-${index}`} //fixes error of only selecting first choice on text click
                                                                label={option}
                                                                name={`question-${question.id}`}
                                                                value={option}
                                                                checked={choice[question.id]===option}
                                                                onChange={()=>trackChoices(question.id,option)}
                                                                />
                                                            )))}
                        </Form.Group>
                    ))}
                </Form>

            {/* </Container> */}
            <div className="d-flex justify-content-end mt-4">
                <Button className='submitButton' 
                    onClick={() => setShowModal(true)} 
                    disabled={Object.keys(choice).length !== basicQuestions.length}
                    >Submit
                </Button>
            </div>
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
                                                                 