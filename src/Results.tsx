import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Spinner, Card, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';

interface ResultPageProps {
  navigateTo: (page: string) => void;
}

interface QuizQuestion {
  id: number;
  body: string;
}

const ResultPage: React.FC<ResultPageProps> = ({ navigateTo }) => {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [jobSuggestions, setJobSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    //Step1: get the quiz answers stored in the local storage
    const stored = localStorage.getItem("quizAnswers");

    //Step2: if the answers are found
    if (stored) {
      const parsedAnswers = JSON.parse(stored);
      //save the parsed answers, that were converted to a string, we need this to display it later
      setQuizAnswers(parsedAnswers);

      // get quiz type to differentiate in prompt
      const quizType = localStorage.getItem("quizType");

      //from question homework
      //gives a base for questions used in quiz. will need to do the same thing in basic or make it a component on its own and use state to access
      const basicQuestions: QuizQuestion[] = [
        { id: 1, body: 'Do you have or do you plan on pursuing a college degree?' },
        { id: 2, body: 'Do you like working with people?' },
        { id: 3, body: 'Do you want to travel for work?' },
        { id: 4, body: 'Are you more of a numbers or words person?' },
        { id: 5, body: 'Which of these tasks sounds the most interesting to you? (Select all that apply)' },
        { id: 6, body: 'Which of the following settings would you most like to work in? (Select all that apply)' },
        { id: 7, body: 'Would you rather invent something new or improve something that already exists?' },
        { id: 8, body: 'What motivates you most in a job?' },
        { id: 9, body: 'Which subjects interest you the most? (Select all that apply)' },
        { id: 10, body: 'How do you feel about taking risks?' },
        { id: 11, body: 'How do you usually approach a new project?' },
        { id: 12, body: 'Do you prefer routine tasks or variety in your work?' }
      ];

      let detailedQuestions: QuizQuestion[] = [ 
        { id: 1, body: 'Do you have or do you plan on pursuing a college degree?' },
        { id: 2, body: 'Do you like working with people?' },
        { id: 3, body: 'Are you more of a numbers or words person?' },
        { id: 4, body: 'Which of these tasks sounds the most interesting to you? (Select all that apply)' },
        { id: 5, body: 'Which of the following settings would you most like to work in? (Select all that apply)' },
        { id: 6, body: 'Would you rather invent something new or improve something that already exists?' },
        { id: 7, body: 'What motivates you most in a job?' },
        { id: 8, body: 'Which subjects interest you the most? (Select all that apply)' },
        { id: 9, body: 'How do you feel about taking risks?' },
        { id: 10, body: 'How do you usually approach a new project?' },
        { id: 11, body: 'Do you prefer routine tasks or variety in your work?' },
        { id: 12, body: 'Do you have any relevant work experience already? If so, does your experience relate to your career goals? (Open-ended)' },
        { id: 13, body: 'How comfortable are you with public speaking?' },
        { id: 14, body: 'What type of work pace do you prefer?' },
        { id: 15, body: 'Do you like working with technology and computers?' },
        { id: 16, body: 'Where are you in your career now? Where do you see yourself as far in the future as you have imagined? (Open-ended)' },
        { id: 17, body: 'What is a skill you wish you could improve or develop? (Open-ended)' },
        { id: 18, body: 'Do you prefer prioritizing work life balance or career growth?' },
        { id: 19, body: 'In team settings, which do you find yourself naturally doing? (Select all that apply)' },
        { id: 20, body: 'Describe your ideal workday in a few sentences. (Open-ended)' },
      ];

      // Implemenet the correct questions based on quiz taken:
      const questionsToUse = quizType === "detailed" ? detailedQuestions : basicQuestions;
      setQuizQuestions(questionsToUse);

      /* Sends a prompt to CHATGPT based on the user's answers 
      * Used Chat GPT itself to help come up with the best way to prompt the AI to get the best results.
      * 
      * Prompt Format:
      * Preface AI with scenario
      * Go through responses to match questions to answers
      * Returns quizzes answers in pairs of questions with respective answers
      * Asks AI to suggest career options based on the questions and respective answers
      */

      const prompt = `A person answered the following about themselves: ${Object.entries(parsedAnswers).map(([idStr, answer]) => {
        const question = questionsToUse.find(q => q.id === parseInt(idStr));
        const formattedAnswer = Array.isArray(answer) ? answer.join(", ") : answer;
        return `\n\n${question?.body}\nAnswer: ${formattedAnswer}`;
      }).join("")}\n\nBased on this, suggest 3 careers that would be a great fit and give a short reason for each.`;

      // Use local storage to retrieve API key from homepage
      const apiKey = JSON.parse(localStorage.getItem("MYKEY") || "null");

      //make a POST request to the OpenAI API
      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", //the model we're using
          messages: [{ role: "user", content: prompt }], //the user message we're sending 
          temperature: 0.7, //how creative the answer should be (0 = focused, 1 = creative)
        }),
      })

      //convert the response from the API into JSON
        .then(res => res.json())

        //get the response text from chat and store it
        .then(data => {
          const text = data.choices?.[0]?.message?.content || "No response.";

          //need a bit more researrch on '/\d+\.\s/' like why did that work and what initally is it?
          const jobs = text.split(/\d+\.\s/).filter((entry: string) => entry.trim() !== ""); // FIXED: explicit type
          setJobSuggestions(jobs); //save the job suggestions
          setLoading(false); //loading finished
        })

        //handle any errors if something goes wrong
        .catch(err => {
          console.error("Error fetching jobs from OpenAI:", err);
          setJobSuggestions(["There was a problem generating your results."]);
          setLoading(false);
        });
    }
  }, []);

  /* download of quiz results as a PDF:
  * JSPDF documentation: https://www.npmjs.com/package/jspdf
  * npm install jspdf
  */
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Career Helpi Quiz Results", 20, 20);

    doc.setFontSize(14);
    doc.text("Your Answers:", 20, 30);

    let y = 40;
    quizQuestions.forEach((question, index) => {
      const answer = quizAnswers[question.id.toString()];
      if (answer !== undefined) {
        const formattedAnswer = Array.isArray(answer) ? answer.join(", ") : answer;
        const lines = doc.splitTextToSize(`${index + 1}. ${question.body}\nAnswer: ${formattedAnswer}`, 170);
        doc.text(lines, 20, y);
        y += lines.length * 10;
      }
    });

    y += 10;
    doc.text("Career Suggestions:", 20, y);
    y += 10;

    const suggestionsText = jobSuggestions.join("\n\n");
    const suggestionsLines = doc.splitTextToSize(suggestionsText, 170);
    doc.text(suggestionsLines, 20, y);

    doc.save("career_finder_results.pdf");
  };

  return (
    <>
      <div
        className="results-page"
        style={{
          backgroundImage: 'url("/minecraft.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
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

        <Container className="py-4">
          <h1>Congratulations!</h1><br />
          <p>You finished the quiz, read below to see your Quiz Results.</p><br />
          {loading ? (
            <div className="text-center mt-4">
              <Spinner animation="border" />
              <p className="mt-2">Generating your results...</p>
            </div>
          ) : (
            <Card className="p-4 shadow-lg mt-4">
              <h4>Recommended Jobs:</h4>
              <ul className='text-start'>
                {jobSuggestions.map((job, index) => (
                  <li key={index} className='mb-3'>{job.trim()}</li>
                ))}
              </ul>
            </Card>
          )}

          {/* Optional: View Answers Button */}
          <Button
            variant="outline-secondary"
            className="mt-4 me-2"
            onClick={() => alert(JSON.stringify(quizAnswers, null, 2))}
          >
            View My Answers
          </Button>

          <Button variant="primary" onClick={downloadPDF}>
            Download Results as PDF
          </Button>
        </Container>
      </div>
    </>
  );
};

export default ResultPage;
