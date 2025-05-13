import React, {useState}from 'react';
import { Container, ProgressBar, Form, Navbar, Nav, Button, Modal} from 'react-bootstrap';
import ReactConfetti from 'react-confetti';
import SwitchModeWrapper from './SwitchMode';

export interface QuizQuestion {
    id: number;
    body: string;
    options?: string[];
    //for select all that apply questions
    isSelectAll?:boolean;
}

//These are the actual quiz questions shown to the user
let basicQuestions: QuizQuestion[] = [
    { id: 1, body: 'Do you have or do you plan on pursuing a college degree?', options: ['Yes', 'No', 'Unsure'] },
    { id: 2, body: 'Do you like working with people?', options: ['Yes', 'I prefer to work alone', 'Occasionally'] },
    { id: 3, body: 'Do you want to travel for work?', options: ['Yes', 'No', 'Sometimes'] },
    { id: 4, body: 'Are you more of a numbers or words person?', options: ['Numbers', 'Words', 'A little bit of both'] },
    { 
        id: 5,
        body: 'Which of these tasks sounds the most interesting to you? (Select all that apply)',
        options: ['Writing a paper', 'Creating and presenting a slideshow', 'Analyze data using statistical analysis', 'Meeting with clients', 'Reading a paper', 'Building something new'],
        isSelectAll: true
    },
    {
        id: 6,
        body: 'Which of the following settings would you most like to work in? (Select all that apply)',
        options: ['A laboratory', 'An office building', 'Outside', 'From home', 'A classroom', 'From a workshop', 'On the road', 'Up on a stage', 'In a hospital'],
        isSelectAll: true
    },
    {
        id: 7,
        body: 'Would you rather invent something new or improve something that already exists?',
        options: ['Make something new', 'Make something better']
    },
    {
        id: 8,
        body: 'What motivates you most in a job?',
        options: ['Helping people', 'Solving problems', 'Being creative', 'Learning something new']
    },
    {
        id: 9,
        body: 'Which subjects interest you the most? (Select all that apply)',
        options: ['Language Arts', 'History', 'Math', 'Finance', 'Natural Sciences', 'Computer Science', 'Political Science', 'Health and Medicinal studies'],
        isSelectAll: true
    },
    {
        id: 10,
        body: 'How do you feel about taking risks?',
        options: ['I enjoy taking risks', 'I prefer to play it safe', 'It depends on the situation']
    },
    {
        id: 11,
        body: 'How do you usually approach a new project?',
        options: ['Plan everything before starting', 'Start with a rough draft of a plan and figure it out as I go on', 'Get input from others before deciding', 'Take it on step by step, one task at a time']
    },
    {
        id: 12,
        body: 'Do you prefer routine tasks or variety in your work?',
        options: ['Routine: I like knowing what to expect', 'Variety: I like something new every day', 'A mix of both']
    }
];


//This component accepts a function called navigateTo to move between pages
interface BasicQuizProps {
    navigateTo: (page: string) => void;
}

let BasicQuiz: React.FC<BasicQuizProps> = ({ navigateTo }) => {
    //Kepps track of users answers (per question Id)
   let [choice,setChoice]=useState<{ [key:number]:string | string[]}>({});

   //Handles night mode but wehre changing this is theme mode since we have minecraft and beach theme modes
   const [switchMode, setSwitchMode] = useState<boolean>(localStorage.getItem("switchMode") === "true");

   //when the user toggles theme mode on/off (beach mode/minecraft mode)
      const switchModeButton = () => {
       const newMode = !switchMode;
       setSwitchMode(newMode);
       localStorage.setItem("switchMode", String(newMode));
     };

    /*
    added this useState to show a popup modal that appears
    when the user clicks the Submit button, telling them they have Completion
    the quiz and can now move on to the results page to see their results

   
     */
    let [showModal, setShowModal] = React.useState(false);

    // This is the encouragement message that appears when the user is 50% done with quiz
    // let [showEncouragement, setShowEncouragement] = React.useState(false);
    // const [prevAnsweredCount, setPrevAnsweredCount] = useState(0);

    //This is the encouragement message goes away after the first time
    // let [hasEncouraged, setHasEncouraged] = React.useState(false);

    //Tracks which question the user is on
    let [currentIndex, setCurrentIndex] = React.useState(0);

    //Gets current question to display
    let currentQuestion = basicQuestions[currentIndex];

    //Encouragement effect
    // useEffect(() => {
    //     const answeredCount = Object.keys(choice).length;
    //     const halfway = Math.floor(basicQuestions.length / 2);
    
        // Trigger only when crossing INTO halfway and not shown yet
        // if (
        //     answeredCount >= halfway &&
        //     prevAnsweredCount < halfway &&
        //     !hasEncouraged
        // ) {
        //     setShowEncouragement(true);
        //     setHasEncouraged(true);
    
        //     setTimeout(() => {
        //         setShowEncouragement(false);
        //     }, 3000);
        // }
    
    //     setPrevAnsweredCount(answeredCount); // update for next run
    // }, [choice]);

     //Updates the users answers when they select a choice
    let trackChoices = (id: number, option: string|string[]) => {
        setChoice({ ...choice, [id]: option });
    };

    //Goes to the next question
    const nextButton = () => {
        if(currentIndex < basicQuestions.length -1){
            setCurrentIndex(currentIndex + 1);
        }
    };

    //Goes to the previous question
    const previousButton = () => {
        if(currentIndex > 0 ){
            setCurrentIndex(currentIndex - 1);
        }
    };

    //When the user submits the quiz *shows confetti and modal
    const submitButton = () => {
        setShowModal(true);
    };

    //LAYOUT & UI
    return (
        <SwitchModeWrapper page="basicQuiz">
            <div className="basic-quiz-page">
                {!switchMode && (
            <>
             {/* Floating GIFs */}
             <img src="./colorful.gif" alt="axolotl" className="floating-gif gif-bottom-right" />
             <img src="./bubbles.gif" alt="bubbles" className="floating-gif gif-bubbles" />
             <img src="./bubbles.gif" alt="bubbles" className="floating-gif gif-bubbles2" />
             <img src="./bubbles.gif" alt="bubbles" className="floating-gif gif-bubbles3" />
             <img src="./bubbles.gif" alt="bubbles" className="floating-gif gif-bubbles4" />
             <img src="./fish.gif" alt="fish" className="floating-gif gif-fish" />
             <img src="./fish.gif" alt="fish" className="floating-gif gif-fish2" />
             <img src="./fish.gif" alt="fish" className="floating-gif gif-fish3" />
             <img src="./fish.gif" alt="fish" className="floating-gif gif-fish4" />
             <img src="./fish.gif" alt="fish" className="floating-gif gif-fish5" />
             <img src="./fish.gif" alt="fish" className="floating-gif gif-fish6" />
             <img src="./clamshell.gif" alt="clamshell" className="floating-gif clamshell" />
             <img src="./rainbowstars.gif" alt="rainbowstars" className="floating-gif rainbowstars" />
             <img src="./rainbowstars.gif" alt="rainbowstars" className="floating-gif rainbowstars2" />
             <img src="./rainbowstars.gif" alt="rainbowstars" className="floating-gif rainbowstars3" />
            </>
                )}

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


        {/*Encouragement message*/}
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
)}     */}
        {/*Quiz Card*/}
        <Container className='d-flex justify-content-center align-items-center'style={{minHeight: '100vh'}}>

            <div className='quiz-card p-4 rounded shadow' style={{maxWidth: '600px', width: '100%' }}>
             <h5 className="mb-4">Question {currentIndex + 1} of {basicQuestions.length}</h5>

        {/* Progressbar logic, now containing check to ensure some question is selected, preventing bar from not going down if user deselects answer */}
             <ProgressBar animated now={(Object.entries(choice).filter(([id, value]) => Array.isArray(value) ? value.length > 0 : Boolean(value)).length / basicQuestions.length) * 100} />

        {/* Quiz form with either Checkboxes(select all) or Radio(select only one) buttons */}
                <Form>
                <Form.Group controlId={`question-${currentQuestion.id}`} className='basicquestion'>
                <Form.Label>{currentQuestion.body}</Form.Label>
                {currentQuestion.options && (
                    currentQuestion.isSelectAll ? (
                        //Checkbox: Multiple answers allowed
                currentQuestion.options.map((option, index) => (
                <Form.Check
                    key={index}
                    type='checkbox'
                    id={`question-${currentQuestion.id}-option-${index}`}
                    label={option}
                    name={`question-${currentQuestion.id}`}
                    value={option}
                    checked={(choice[currentQuestion.id] || []).includes(option)}
                    onChange={(e) => {
                        let currentChoice = choice[currentQuestion.id] || [];
                        if (e.target.checked) {
                            trackChoices(currentQuestion.id, [...(currentChoice as string[]), option]);
                        } else {
                            trackChoices(
                                currentQuestion.id,
                                (currentChoice as string[]).filter((o: string) => o !== option)
                            );
                        }
                    }}
                />
            ))
        ) : (
            currentQuestion.options.map((option, index) => (
                <Form.Check
                    key={index}
                    type='radio'  //Radio: one ansswer only 
                    id={`question-${currentQuestion.id}-option-${index}`}
                    label={option}
                    name={`question-${currentQuestion.id}`}
                    value={option}
                    checked={choice[currentQuestion.id] === option}
                    onChange={() => trackChoices(currentQuestion.id, option)}
                />
            ))
        )
    )}
</Form.Group>
</Form>

            {/* Navigation Buttons Customed to Star fishes */}
            <div className="arrow-button-container">
            {currentIndex > 0 && (
            <img
                src="./previousArrow.png"
                alt="PreviousButton"
                className='arrow-btn'
                onClick={previousButton}
                // disabled={currentIndex === 0}
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
            {currentIndex === basicQuestions.length - 1 && (
            <div className="d-flex justify-content-center mt-4">
                    <Button className='submitButton' 
                        onClick={submitButton}
                        disabled={!choice[currentQuestion.id]}
                        > Submit
                    </Button> 
            </div>
              )}
            </div>

            
        
    </Container>
        {/* Popup that shows when the quiz is finished */}

        {/* Completed Modal*/}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName='themed-modal'>
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
                localStorage.setItem("quizType", "basic"); // include this line to store which type of quiz the user took in order to prompt GPT with the correct questions.

                //Stores quiz data in localStorge and go to results page
                localStorage.setItem("quizAnswers", JSON.stringify(choice)); 
                navigateTo("result")}}>View Results</Button>
        </Modal.Footer>
        </Modal>
        </div>
        </SwitchModeWrapper>
    );
};

export default BasicQuiz;
                                                                 
