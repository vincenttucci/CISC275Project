
import React, {useState} from 'react';
import {Container,ProgressBar, Form, Navbar, Nav, Button, Alert} from 'react-bootstrap';
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
//used AI to generate random questions
let detailedQuestions: QuizQuestion[]= [ { id: 1, body: 'Do you enjoy problem-solving?', options: ['Yes, a lot!', 'Sometimes', 'Not really'] },
{ id: 2, body: 'Do you like working with people?', options: ['Yes', 'Occasionally', 'I prefer working alone'] },
{ id: 3, body: 'Do you prefer working with numbers or words?', options: ['Numbers', 'Words', 'Both equally'] },
{ id: 4, body: 'Would you rather work indoors or outdoors?', options: ['Indoors', 'Outdoors', 'No preference'] },
{ id: 5, body: 'Do you enjoy creative tasks?', options: ['Yes', 'Sometimes', 'Not really'] },
{ id: 6, body: 'Do you like working with technology?', options: ['Yes', 'A little', 'Not really'] },
{ id: 7, body: 'Are you comfortable with public speaking?', options: ['Yes', 'With practice', 'Not at all'] },
{ id: 8, body: 'Do you prefer working alone or in a team?', options: ['Alone', 'In a team', 'Depends on the task'] },
{ id: 9, body: 'Do you enjoy helping others?', options: ['Yes, very much', 'Sometimes', 'Not really'] },
{ id: 10, body: 'Are you interested in science?', options: ['Yes', 'Somewhat', 'Not really'] },
{ id: 11, body: 'Would you enjoy managing a group of people?', options: ['Yes', 'Maybe', 'No'] },
{ id: 12, body: 'Do you like solving puzzles or complex problems?', options: ['Yes', 'Sometimes', 'No'] },
{ id: 13, body: 'Would you rather work on long-term projects or short, varied tasks?', options: ['Long-term projects', 'Short tasks', 'A mix of both'] },
{ id: 14, body: 'Do you prefer a structured routine or a flexible schedule?', options: ['Structured routine', 'Flexible schedule', 'No preference'] },
{ id: 15, body: 'Are you comfortable with handling risks in decision-making?', options: ['Yes', 'Somewhat', 'Not at all'] },
{ id: 16, body: 'Do you enjoy working with your hands?', options: ['Yes', 'Sometimes', 'Not really'] },
{ id: 17, body: 'Are you interested in healthcare and medicine?', options: ['Yes', 'Somewhat', 'Not at all'] },
{ id: 18, body: 'Do you like researching and analyzing information?', options: ['Yes', 'Sometimes', 'No'] },
{ id: 19, body: 'Would you prefer working in an office, a lab, or in the field?', options: ['Office', 'Lab', 'Field'] },
{ id: 20, body: 'Do you want a job that involves travel?', options: ['Yes, frequently', 'Occasionally', 'No, I prefer stability'] },
{ id: 21, body: 'What was your dream career as a child?', isOpenEnded:true},
{ id: 22, body: 'Describe a project or task you really enjoyed.', isOpenEnded: true },
{ id: 23, body: 'Which of these activities do you enjoy? (Select all that apply)', options: ['Reading', 'Traveling', 'Gaming', 'Cooking'],isSelectAll:true}]


interface DetailedQuizProps {
    navigateTo: (page: string) => void;
}

let DetailedQuiz: React.FC<DetailedQuizProps> = ({ navigateTo }) => {
        let [choice,setChoice]=useState<{ [key:number]:string | string[]}>({});
        let [popup, setPopup]=useState(false);
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
        let submitHandler=()=> {
            let answeredAll=detailedQuestions.every((question)=>{
                let answer=choice[question.id];
                if (question.isOpenEnded) return typeof answer === 'string' && answer.trim() !== '';
            if (question.isSelectAll) return Array.isArray(answer) && answer.length > 0;
            return typeof answer === 'string' && answer !== '';
            });
            if (!answeredAll){
                setPopup(true);
            }else{
                setPopup(false);
                navigateTo('result')
            }
        }
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
                {/* updates bar */}
                {/* added stripes and animations for razzle dazzle */}
                <ProgressBar className='progress' animated now={(answerCount/detailedQuestions.length)*100} label={`${answerCount}/${detailedQuestions.length}`}/>
                {/* why "py-4"? have to ask brooklyn */} 

                {/* This is Brooklyn answering you, 'py-4' is Padding on the Y-axis (top&bottom) 
                        p=padding
                        y=vertical axis (top & bottom)
                        4= spacing unit
                py-4 adds breathing room vertically, making the layout more spaced out and polished,
                like around the headers, and our other content stuff. You can use other 'py' types
                like py-3 or py-2, but I just used py-4 to mess around you can always change it
                 */}
                 
                <Container className='py-4'>
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
                    {popup && (
                        <Container className="popup">
                        <Alert
            variant="danger"
            dismissible
            onClose={() => setPopup(false)}
        >
                            Please answer all the questions before submitting.
                        </Alert>
                    </Container>
                    )}
                    </Container>
                    <Button className='submitButton' onClick={submitHandler}>Submit</Button>
            {/* // <h2>Detailed Quiz</h2>
            // <p>This is the detailed quiz</p> */}
            
            </div>
           
        )
       
            
    };
export default DetailedQuiz;