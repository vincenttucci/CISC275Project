import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Card, Button } from 'react-bootstrap';
import jsPDF from 'jspdf'; //library used to generate PDFs

interface ResultPageProps {
  navigateTo: (page: string) => void;
}

//Shape for each quiz question
interface QuizQuestion {
  id: number;
  body: string;
}

//Structure for each job suggestion from ChatGPT
interface JobDetail{
  title: string;
  description: string;
  salary?: string;
  education?: string;
  training?: string;
}

const ResultPage: React.FC<ResultPageProps> = ({ navigateTo }) => {
  //Stores user's answers retrieved from localStorage
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string | string[] }>({});

  //Whether data is still loading (waiting for API)
  const [loading, setLoading] = useState(true);

  //Stores questions that match the quiz the user took
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  //Stores job recommendation returned from ChatGPT
  const [jobSuggestions, setJobSuggestions] = useState<JobDetail[]>([]);

  useEffect(() => {
    //Step1: get the quiz answers stored in the local storage
    const stored = localStorage.getItem("quizAnswers");

    //Step2: if the answers are found, parse them
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

      //Step 3: Generate GPT prompt from users answers
      const prompt = `You are a career advisor. A user has taken a career quiz to help identify roles they might thrive in and enjoy
      
      Evaluate the answers below and, based on all reponses, suggest 5 careers that would align well with this user's preferences. 
      
      For each career, explain briefly why it matches, referencing multiple aspects from the user's answers. 
      
      Also, and this isn't necessary for every career every time, list skills, experience, education, training, etc. that might help the user to know.
                      
      Very Important: if the  user answered "No" to whether they have or plan to pursue a college degree. You must only recommend careers that do not require a college degree to enter. 
      It is okay if a degree is optional or helpful, but do not suggest jobs that typically require one. 

      Also, make sure to address the user directly and don't just say "the user".

      Do not start out with an intro or and with a conclusion. Just give the list of careers and their explanations. 

      If its a corporate job, you may list best companies to work for, salary expecations, and popular city locations for the job.

      IMPORTANT: NEVER UNDER ANY CIRCUMSTANCE use asteriks anywhere on the output, especially around the career choice titles.
      
      Now based on the answers, return a JSON array of the 5 recommended jobs in the following format
      [
    {
    "title": "Job Title",
    "description": "Why it's a match",
    "salary": "Average salary (optional)",
    "education": "Education required (optional, but if the job does require a degre, list the best schools(5 schools) for that degree in bullet points)",
    "training": "Best training or schools (optional)"
    },
       ...
      ]
  
      ${Object.entries(parsedAnswers).map(([idStr, answer]) => {
      const question = questionsToUse.find(q => q.id === parseInt(idStr));
      const formattedAnswer = Array.isArray(answer) ? answer.join(", ") : answer;
        return `\n\n${question?.body}\nAnswer: ${formattedAnswer}`;
      }).join("")}`;


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
          model: "gpt-4", //the model we're using
          messages: [{ role: "user", content: prompt }], //the user message we're sending 
          temperature: 0.7, //how creative the answer should be (0 = focused, 1 = creative)
        }),
      })

      //convert the response from the API into JSON
        .then(res => res.json())

        //get the response text from chat and store it
        .then(data => {
          const text = data.choices?.[0]?.message?.content || "[]";
          try{

            //Try to parse the GPT response as JSON
            const jobs: JobDetail[] = JSON.parse(text);
              setJobSuggestions(jobs);
            } catch (err) {

              //If JSON parsing fails, show error message 
              console.error("Failed to parse job JSON:", text);
              setJobSuggestions([
                {
                  title: "⚠️ Error",
                  description: "There was a problem generating your results. Please try again later.",
                },
              ]);
            }
          setLoading(false); //loading finished
        })

        //handle any errors if something goes wrong
        .catch(err => {
          setJobSuggestions([
            {
              title: "⚠️ Error",
              description: "There was a problem connecting to the server.",
            },
          ]);
          setLoading(false);
        });
    }
  }, []);

  /* download of quiz results as a PDF:
  * JSPDF documentation: https://www.npmjs.com/package/jspdf
  * npm install jspdf
  * 
  * Used Chat GPT to help learn how to use the library and set up a PDF output with JSPDF library
  */


  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Add header/title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text("The Career Lagoon Quiz Results", 20, 20);
  
    // Career Suggestions
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    let y = 35;
    doc.text("Career Suggestions", 20, y);
    doc.setLineWidth(0.5);
    doc.line(20, y + 2, 190, y + 2);
    y += 8;
  
    // Smaller font for suggestions to fit on one page
    doc.setFontSize(10);
  
    //Add each suggeestion line-by-line
    jobSuggestions.forEach((job, index) => {
    const sections = [
    `${index + 1}. ${job.title}`,
    `Description: ${job.description}`,
    `Average Salary: ${job.salary}`,
    `Education Needed: ${job.education}`,
    `Best Training/Schools: ${job.training}`
    ];

    // Section different parts of output separately
    sections.forEach(section => {
    const lines = doc.splitTextToSize(section, 170); // lines that are too long get split onto next line
    (lines as string[]).forEach((line: string) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.text(line, 20, y);
    y += 6; // add line spacing between lines
    });
  y += 4;
  });
  y += 6; // Add extra spacing between jobs to separate them
});

  
    // Start answers on a new page
    doc.addPage();
    y = 20;
    doc.setFontSize(14);
    // header
    doc.setFont('helvetica', 'bold');
    doc.text("Your Quiz Answers", 20, y);
    doc.setLineWidth(0.5);
    doc.line(20, y + 2, 190, y + 2);
    y += 10;
  
    // font for page content
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
  
    // go throguh quiz answers and add them to the PDF
    quizQuestions.forEach((question, index) => {
      const answer = quizAnswers[question.id.toString()];
      if (answer !== undefined) {
        // convert answers to strings
        const formattedAnswer = Array.isArray(answer) ? answer.join(", ") : answer;
        const text = `${index + 1}. ${question.body}\nAnswer: ${formattedAnswer}`;
        const lines = doc.splitTextToSize(text, 170);

        // add each line to the PDF
        lines.forEach((line: string) => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          doc.text(line, 20, y);
          y += 6; // add line spacing between lines
        });
        y += 4; // spacing between questions
      }
    });
  
    // Optional: Add a footer or signature
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text("Generated by Career Lagoon | https://vincenttucci.github.io/CISC275Project/", 20, 285);
  
    doc.save("career_lagoon_results.pdf");
  };
  
  return (
    <>
      <div
        className="results-page"
     
      >
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
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="py-4">
          <h1>Congratulations!</h1><br />
          <p>You finished the quiz, read below to see your Quiz Results.</p><br />
          {loading ? (
            <div className="loading-screen">
            <img src="./bigfish.gif" alt="loading..." className='loading-gif'/>
            {/* <Spinner animation="border" /> */}
              <p className="mt-2">Generating your results...</p>
            </div>
          ) : (
            <>

            {jobSuggestions.map((job, index) => (
             <Card key={index} className="my-4 p-3 pixel-card">
               <h3 className="job-title">{job.title}</h3>

               <div className="job-section">
                 <strong>Description:</strong>
                 <p>{job.description}</p>
               </div>

               {job.salary && (
                 <div className="job-section">
                   <strong>Average Salary:</strong>
                   <p>{job.salary}</p>
                 </div>
               )}

               {job.education && (
                 <div className="job-section">
                   <strong>Education Needed:</strong>
                   <p>{job.education}</p>
                 </div>
               )}

               {job.training && (
                 <div className="job-section">
                   <strong>Best Training/Schools:</strong>
                   <p>{job.training}</p>
                 </div>
               )}
             </Card>
           ))}
  

          <Button variant="primary" onClick={downloadPDF}>
            Download Results as PDF
          </Button>
          </>
          )}
        </Container>
      </div>
    </>
  );
};

export default ResultPage;
