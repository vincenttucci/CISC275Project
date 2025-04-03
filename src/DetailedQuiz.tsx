
import React, {useState} from 'react';
import {Container,ProgressBar, Form} from 'react-bootstrap';
//from question homework
//gives a base for questions used in quiz. will need to do the same thing in basic or make it a component on its own and use state to access
export interface QuizQuestion {
    /** A unique identifier for the question */
    id: number;
    /** The human-friendly title of the question */
    body: string;
    /** The possible answers for a Question (for Multiple Choice questions) */
    options: string[];

   
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
{ id: 20, body: 'Do you want a job that involves travel?', options: ['Yes, frequently', 'Occasionally', 'No, I prefer stability'] }]
let DetailedQuiz: React.FC = () => {
        let [choice,setChoice]=useState<{ [key:number]:string}>({});
        //tracks answer chosen on specific question by question id number
        let trackChoices=(id:number,option:string)=>{
            setChoice({...choice,[id]:option})
        }
        return(
            <div>
                {/* updates bar */}
                <ProgressBar now={(Object.keys(choice).length/detailedQuestions.length)*100} label={`${Object.keys(choice).length}/${detailedQuestions.length}`}/>
                {/* why "py-4"? have to ask brooklyn */}
                <Container className='py-4'>
                    <Form>
                        {detailedQuestions.map((question)=>(
                            // sets up questions and options and keeps them oranized on the same page
                            <Form.Group key={question.id} controlId={`question-${question.id}`} className='detailedquestion'>
                                <Form.Label>{question.body}</Form.Label>
                                {question.options.map((option,index)=>(
                                    //handles the radio buttons
                                    //reference-homework 10
                                    <Form.Check
                                    key={index}
                                    type="radio"
                                    label={option}
                                    name={`question-${question.id}`}
                                    value={option}
                                    checked={choice[question.id]===option}
                                    onChange={()=>trackChoices(question.id,option)}
                                    />
                                ))}
                            </Form.Group>
                        ))}
                    </Form>
                    </Container>
            {/* // <h2>Detailed Quiz</h2>
            // <p>This is the detailed quiz</p> */}
            
            </div>
           
        )
       
            
    };
export default DetailedQuiz;