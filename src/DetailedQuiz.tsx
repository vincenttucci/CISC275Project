
import React, {useState} from 'react';
import ReactConfetti from 'react-confetti';
import {Container,ProgressBar, Form, Navbar, Nav, Button, Modal} from 'react-bootstrap';
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
//used AI to generate some question answer choices
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
    { id: 12, body: 'Do you have any relevant work experience already? If so, does your experience relate to your career goals? (Open-ended)', isOpenEnded: true },
    { id: 13, body: 'How comfortable are you with public speaking?', options: ['Very comfortable', 'Somewhat comfortable', 'Not a chance'] },
    { id: 14, body: 'What type of work pace do you prefer?', options: ['Fast-paced and dynamic', 'Steady and predictable', 'A mix depending on the task']},
    { id: 15, body: 'Do you like working with technology and computers?', options: ['Yes, very much', 'Somewhat', 'Not really'] },
    { id: 16, body: 'Where are you in your career now? Where do you see yourself as far in the future as you have imagined? (Open-ended)', isOpenEnded: true },
    { id: 17, body: 'What is a skill you wish you could improve or develop? (Open-ended)', isOpenEnded: true },
    { id: 18, body: 'Do you prefer prioritizing work life balance or career growth?', options: ['Work Life Balance', 'Career Growth', 'Unsure'] },
    { id: 19, body: 'In team settings, which do you find yourself naturally doing? (Select all that apply)', options: ['Managing other members', 'Completing tasks', 'Planning future tasks', 'Generating Ideas', 'Performing Quality Checks'], isSelectAll: true },
    { id: 20, body: 'Describe your ideal workday in a few sentences. (Open-ended)', isOpenEnded: true },
];

interface DetailedQuizProps {
    navigateTo: (page: string) => void;
}

let DetailedQuiz: React.FC<DetailedQuizProps> = ({ navigateTo }) => {
        let [choice,setChoice]=useState<{ [key:number]:string | string[]}>({});
        // let [popup, setPopup]=useState(false);
        let [showModal, setShowModal] = React.useState(false);
        //tracks answer chosen on specific question by question id number
        let trackChoices=(id:number,option:string|string[])=>{
            setChoice({...choice,[id]:option})
        }
        //counting number of answered question for the select all and opened ended questions
        //done for progress bar to update correctly
        let answerCount=detailedQuestions.filter((question)=>{
            let answer=choice[question.id];
            if (question.isOpenEnded) return typeof answer === 'string' && answer.trim() !== '';
            if (question.isSelectAll) return Array.isArray(answer) && answer.length > 0;
            return typeof answer === 'string' && answer !== '';
        }).length;
        // let submitHandler=()=> {
        //     let answeredAll=detailedQuestions.every((question)=>{
        //         let answer=choice[question.id];
        //         if (question.isOpenEnded) return typeof answer === 'string' && answer.trim() !== '';
        //     if (question.isSelectAll) return Array.isArray(answer) && answer.length > 0;
        //     return typeof answer === 'string' && answer !== '';
        //     });
        //     if (!answeredAll){
        //         setPopup(true);
        //     }else{
        //         setPopup(false);
        //         navigateTo('result')
        //     }
        
        return(
            <div 
            style={{
                backgroundImage:'url("/pinkBG.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100%',
                width: '100%'
            }}>
                {/* navigation bar  */}
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
            <ProgressBar className='progress' animated now={(answerCount/detailedQuestions.length)*100} label={`${answerCount}/${detailedQuestions.length}`}/>
            </div>
             {/*Quiz Card*/}
                    <Container className='d-flex justify-content-center align-items-center'style={{minHeight: '100vh'}}>
                        <div className='quiz-card p-4 rounded shadow bg-white' style={{ maxWidth: '600px', width: '100%' }}>
                         <h5 className="mb-4">Quiz</h5>
            
                        {/* Quiz Content */}
                        
                {/* updates bar */}
                {/* added stripes and animations for razzle dazzle */}
                {/* <ProgressBar className='progress' animated now={(answerCount/detailedQuestions.length)*100} label={`${answerCount}/${detailedQuestions.length}`}/> */}
                {/* why "py-4"? have to ask brooklyn */} 

                {/* This is Brooklyn answering you, 'py-4' is Padding on the Y-axis (top&bottom) 
                        p=padding
                        y=vertical axis (top & bottom)
                        4= spacing unit
                py-4 adds breathing room vertically, making the layout more spaced out and polished,
                like around the headers, and our other content stuff. You can use other 'py' types
                like py-3 or py-2, but I just used py-4 to mess around you can always change it
                 */}
                 
                {/* <Container className='py-4'> */}
                    <Form>
                        {detailedQuestions.map((question)=>(
                            // sets up questions and options and keeps them oranized on the same page
                            <Form.Group key={question.id} controlId={`question-${question.id}`} className='detailedquestion'>
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
                    <div className="d-flex justify-content-end mt-4">
                                    <Button className='submitButton' 
                                        onClick={() => setShowModal(true)} 
                                        disabled={Object.keys(choice).length !== detailedQuestions.length}
                                        >Submit
                                    </Button>
                                </div>
                            </div>
                            </Container>
                    {/* </Container> */}
                    {/* <Button className='submitButton' onClick={submitHandler}>Submit</Button>
            // <h2>Detailed Quiz</h2>
            // <p>This is the detailed quiz</p> */}
            {/* popup for when quiz is complete */}
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
                    </div>
           
        )
       
            
    };
export default DetailedQuiz;