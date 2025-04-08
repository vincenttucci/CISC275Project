import React from 'react';
import { Container, ProgressBar, Form, Navbar, Nav } from 'react-bootstrap';

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

    let trackChoices = (id: number, option: string) => {
        setChoice({ ...choice, [id]: option });
    };

    return (
        <div>
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

            {/* Quiz Content */}
            <ProgressBar now={(Object.keys(choice).length / basicQuestions.length) * 100} label={`${Object.keys(choice).length}/${basicQuestions.length}`} />

            <Container className='py-4'>
                <Form>
                    {basicQuestions.map((question) => (
                        <Form.Group key={question.id} controlId={`question-${question.id}`} className='basicquestion'>
                            <Form.Label>{question.body}</Form.Label>
                            {question.options.map((option, index) => (
                                <Form.Check
                                    key={index}
                                    type="radio"
                                    id={`question-${question.id}-option-${index}`} //fixes error of only selecting first choice on text click
                                    label={option}
                                    name={`question-${question.id}`}
                                    value={option}
                                    checked={choice[question.id] === option}
                                    onChange={() => trackChoices(question.id, option)}
                                />
                            ))}
                        </Form.Group>
                    ))}
                </Form>
            </Container>
        </div>
    );
};

export default BasicQuiz;
