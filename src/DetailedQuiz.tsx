
import React, {useState} from 'react';
import ReactConfetti from 'react-confetti';
import {Container,ProgressBar, Form, Navbar, Nav, Button, Modal} from 'react-bootstrap';
import SwitchModeWrapper from './SwitchMode';
//from question homework
//gives a base for questions used in quiz. will need to do the same thing in basic or make it a component on its own and use state to access
export interface QuizQuestion {
    /** A unique identifier for the question */
    id: number;
    /** The human-friendly title of the question */
    body: string;
    /** The possible answers for a Question (for Multiple Choice questions) */
    options?: string[];
    //for questions that require textarea
    isOpenEnded?: boolean;
    //for select all that apply questions
    isSelectAll?:boolean;
}
//used AI ChatGPT 4.0 to generate some question answer choices
let detailedQuestions: QuizQuestion[]= [ 
    { id: 1, body: 'Do you have or do you plan on pursuing a college degree?', options: ['Yes', 'No', 'Unsure'] },
    { id: 2, body: 'Do you like working with people?', options: ['Yes', 'I prefer to work alone', 'Occasionally'] },
    { id: 3, body: 'Are you more of a numbers or words person?', options: ['Numbers', 'Words', 'A little bit of both'] },
    { id: 4, body: 'Which of these tasks sounds the most interesting to you? (Select all that apply)', options: ['Writing a paper', 'Creating and presenting a slideshow', 'Analyze data using statistical analysis', 'Meeting with clients', 'Reading a paper', 'Building something new'], isSelectAll: true },
    { id: 5, body: 'Which of the following settings would you most like to work in? (Select all that apply)', options: ['A laboratory', 'An office building', 'Outside', 'From home', 'A classroom', 'From a workshop', 'On the road', 'Up on a stage', 'In a hospital'], isSelectAll: true },
    { id: 6, body: 'Would you rather invent something new or improve something that already exists?', options: ['Make something new', 'Make something better'] },
    { id: 7, body: 'What motivates you most in a job?', options: ['Helping people', 'Solving problems', 'Being creative', 'Learning something new'] },
    { id: 8, body: 'Which subjects interest you the most? (Select all that apply)', options: ['Language Arts', 'History', 'Math', 'Finance', 'Natural Sciences', 'Computer Science', 'Political Science', 'Health and Medicinal studies'], isSelectAll: true },
    { id: 9, body: 'How do you feel about taking risks?', options: ['I enjoy taking risks', 'I prefer to play it safe', 'It depends on the situation'] },
    { id: 10, body: 'How do you usually approach a new project?', options: ['Plan everything before starting', 'Start with a rough draft of a plan and figure it out as I go on', 'Get input from others before deciding', 'Take it on step by step, one task at a time'] },
    { id: 11, body: 'Do you prefer routine tasks or variety in your work?', options: ['Routine', 'Variety', 'A balance of both'] },

    { id: 12, body: 'Describe a time you solved a difficult problem.', isOpenEnded: true },
    { id: 13, body: 'Would you rather work independently or as part of a team?', options: ['Independently', 'Part of a team', 'Depends on the project'] },
    { id: 14, body: 'How comfortable are you with public speaking?', options: ['Very comfortable', 'Somewhat comfortable', 'Not comfortable at all'] },
    { id: 15, body: 'What type of work pace do you prefer?', options: ['Fast-paced and dynamic', 'Steady and predictable', 'A mix depending on the task'] },
    { id: 16, body: 'Do you like working with technology and computers?', options: ['Yes, very much', 'Somewhat', 'Not really'] },
    { id: 17, body: 'Which activities do you enjoy most? (Select all that apply)', options: ['Creating art or music', 'Fixing or building things', 'Organizing events', 'Helping people solve problems'], isSelectAll: true },
    { id: 18, body: 'What is a skill you wish you could improve or develop?', isOpenEnded: true },
    { id: 19, body: 'Would you rather work with data, people, or ideas?', options: ['Data', 'People', 'Ideas'] },
    { id: 20, body: 'Describe your ideal workday in a few sentences.', isOpenEnded: true },

];

interface DetailedQuizProps {
    navigateTo: (page: string) => void;
}

let DetailedQuiz: React.FC<DetailedQuizProps> = ({ navigateTo }) => {
        let [choice,setChoice]=useState<{ [key:number]:string | string[]}>({});
        let [showModal, setShowModal] = React.useState(false); //For modual after submission
        //For encouragement message
        // let [showEncouragement, setShowEncouragement] = React.useState(false);
        // const [prevAnsweredCount, setPrevAnsweredCount] = useState(0); //to keep track of how many questions have been answered
        // let [hasEncouraged,setHasEncouraged]=useState(false); //to keep track of if encouragement has been shown

        let [currentIndex, setCurrentIndex] = React.useState(0); //keeps track of question number 
        let currentQuestion = detailedQuestions[currentIndex];

        // useEffect(() => {
            
        //     const answeredCount = Object.keys(choice).length;
        //     const halfway = Math.floor(detailedQuestions.length / 2);
        
        //     // Trigger only when crossing INTO halfway and not shown yet
        //     if (
        //         answeredCount >= halfway &&
        //         prevAnsweredCount < halfway &&
        //         !hasEncouraged
        //     ) {
        //         setShowEncouragement(true);
        //         setHasEncouraged(true);
        
        //         setTimeout(() => {
        //             setShowEncouragement(false);
        //         }, 3000);
        //     }
        
        //     setPrevAnsweredCount(answeredCount); // update for next run
        // }, [choice]);

        const [switchMode, setSwitchMode] = useState<boolean>(localStorage.getItem("switchMode") === "true"); //to switch between beach and mc mode

        //tracks answer chosen on specific question by question id number
        let trackChoices=(id:number,option:string|string[])=>{
            setChoice({...choice,[id]:option})
        }
        //navigates to next question
        const nextButton = () => {
            if(currentIndex < detailedQuestions.length -1){
                setCurrentIndex(currentIndex + 1);
            }
        };
    //navigates to previous question
        const previousButton = () => {
            if(currentIndex > 0 ){
                setCurrentIndex(currentIndex - 1);
            }
        };
    //submits answers and triggers modal and confetti
        const submitButton = () => {
            setShowModal(true);
        };
        //switched from beach to mc/ from mc to beach and shares the mode between pages
        const switchModeButton = () => {
            const newMode = !switchMode;
            setSwitchMode(newMode);
            localStorage.setItem("switchMode", String(newMode));
          };
        
        return(
            <div >
                <SwitchModeWrapper page="detailedQuiz">
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
                                                {/* switches emoji based on set mode */}
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
            {/* Encouragement message */}
            {/* {showEncouragement && (
    <Alert
        variant="info"
        style={{
            position: 'fixed',
            top: '70px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1051,
            width: '80%',
            maxWidth: '500px',
            textAlign: 'center',
            fontSize: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
    >
        🎉 You're halfway there! Keep going!
    </Alert>
)} */}
            
                    <Container className='d-flex justify-content-center align-items-center'style={{minHeight: '100vh'}}>
                    

                        <div className='quiz-card p-4 rounded shadow' style={{ maxWidth: '600px', width: '100%' }}>
                         <h5 className="mb-4">Question {currentIndex + 1} of {detailedQuestions.length}</h5>
                         {/*Progressbar logic, now containing check to ensure some question is selected, preventing bar from not going down if user deselects answer*/}
                         <ProgressBar className='progress' animated now={(Object.entries(choice).filter(([_, value]) =>Array.isArray(value) ? value.length > 0 : Boolean(value)).length / detailedQuestions.length) * 100}/>
                        {/* updates and animates bar */}
                        
                        
               
                    <Form>
                            <Form.Group controlId={`question-${currentQuestion.id}`} className='detailedquestion'>
                                <Form.Label>{currentQuestion.body}</Form.Label>
                                {/* controls open ended questions. Adds textbox and tracks answers using tackchoices function */}
                                {currentQuestion.isOpenEnded ? (
                                    <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={choice[currentQuestion.id] ||''}
                                    onChange={(e)=> trackChoices(currentQuestion.id,e.target.value)}
                                    placeholder='Answer Here'
                                    />
                                    //controls select all questions. Adds checkboxes and tracks all answers using tackchoices function 
                                ): currentQuestion.isSelectAll ?(
                                    currentQuestion.options?.map((option,index) => (
                                        <Form.Check
                                        key={index}
                                        type='checkbox'
                                        id={`question-${currentQuestion.id}-option-${index}`}
                                        label={option}
                                        name={`question-${currentQuestion.id}`}
                                        value={option}
                                        checked={(choice[currentQuestion.id]||[]).includes(option)}
                                        onChange={(e)=>{let currentChoice=choice[currentQuestion.id]||[];
                                            if (e.target.checked) {
                                                trackChoices(currentQuestion.id,[...(currentChoice as string[]),option]);
                                            }else {
                                                trackChoices(currentQuestion.id,(currentChoice as string[]).filter((o:string)=> o!== option));
                                            }
                                        }}
                                        />
                                    ))
                                ):(
                                currentQuestion.options?.map((option,index)=>(
                                    //handles the radio buttons
                                    //reference-homework 10
                                    <Form.Check
                                    key={index}
                                    type="radio"
                                    id={`question-${currentQuestion.id}-option-${index}`} //fixes error of only selecting first choice on text click
                                    label={option}
                                    name={`question-${currentQuestion.id}`}
                                    value={option}
                                    checked={choice[currentQuestion.id]===option}
                                    onChange={()=>trackChoices(currentQuestion.id,option)}
                                    />
                                )))}
                            </Form.Group>
                    </Form>
                    {/* Same buttons as basic question page */}
                    <div className="arrow-button-container">
            {currentIndex > 0 && (
            <img
                src="./previousArrow.png"
                alt="PreviousButton"
                className='arrow-btn'
                onClick={previousButton}
                />
            )}

            <img
                src="./nextArrow.png"
                alt="Next Button"
                className="arrow-btn"
                onClick={nextButton}
                style={{
                     opacity: !choice[currentQuestion.id] ? 0.5 : 1,
                     pointerEvents: !choice[currentQuestion.id] ? 'none' : 'auto' }}
                />
    
            </div>

            {/* Only shows SUBMIT BUTTON on the last question */}
                {currentIndex === detailedQuestions.length - 1 && (
                    <div className="d-flex justify-content-center mt-4">
                                    <Button className='submitButton' 
                                        onClick={submitButton} 
                                        disabled={!choice[currentQuestion.id]}
                                        >Submit
                                    </Button>
                                </div>
                    )}
                            </div>
                            </Container>
                            
            {/* popup with confetti for when quiz is complete */}
             <Modal show={showModal} onHide={() => setShowModal(false)} centered>
             {showModal && <ReactConfetti />}
                    <Modal.Header closeButton>
                        <Modal.Title>Quiz Completed!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            Great Job completing the quiz. Click below to see your results!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={() => setShowModal(false)}>Close</Button>
                        <Button variant='primary' onClick={() => {
                            localStorage.setItem("quizType", "detailed"); // include this line to store which type of quiz the user took in order to prompt GPT with the correct questions.
                            localStorage.setItem("quizAnswers", JSON.stringify(choice)); 
                            navigateTo("result")}}>View Results</Button>
                    </Modal.Footer>
                    </Modal>
                    </SwitchModeWrapper>
                    </div>
                    
           
        )
       
            
    };
export default DetailedQuiz;