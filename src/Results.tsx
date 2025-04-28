import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Spinner, Card, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';

interface ResultPageProps {
  navigateTo: (page: string) => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ navigateTo }) => {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
  const [jobSuggestions, setJobSuggestions] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Step1: get the quiz answers stored in the local storage
    const stored = localStorage.getItem("quizAnswers");

    //Step2: if the answers are found
    if (stored) {
      const parsedAnswers = JSON.parse(stored);
      //save the parsed answers, that were converted to a string, we need this to display it later
      setQuizAnswers(parsedAnswers);

      //this sends a prompt to CHATGPT based on the user's answers 
      const prompt = `A person answered the following about themselves: ${Object.values(parsedAnswers).join(", ")}. Based on this, suggest 3 careers that would be a great fit and give a short reason for each.`;

      // Use local storage to retrieve API key from homepage
      const apiKey = JSON.parse(localStorage.getItem("MYKEY") || "null");

      //make a POST request to the OpenAI API
      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`, // added {apiKey} to retrieve the API key from local storage, as entered on homepage
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
          setJobSuggestions(text); //save the job suggestions
          setLoading(false); //loading finished
        })

        //handle any errors if something goes wrong
        .catch(err => {
          console.error("Error fetching jobs from OpenAI:", err);
          setJobSuggestions("There was a problem generating your results.");
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
    doc.text("\nYour Answers:", 20, 40);

    let y = 50;
    Object.entries(quizAnswers).forEach(([question, answer], index) => {
      doc.text(`${index + 1}. ${question}: ${answer}`, 20, y);
      y += 10;
    });

    doc.text("\nCareer Suggestions:", 20, y + 10);

    const suggestionsLines = doc.splitTextToSize(jobSuggestions, 170);
    doc.text(suggestionsLines, 20, y + 20);

    doc.save("career_finder_results.pdf");
  };

  return (
    <>
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
            <p>{jobSuggestions}</p>
          </Card>
        )}

        {/* Optional: View Answers Button */}
        <Button
          variant="outline-secondary"
          className="mt-4"
          onClick={() => alert(JSON.stringify(quizAnswers, null, 2))}
        >
          View My Answers
        </Button>

        <Button variant="primary" onClick={downloadPDF}>
          Download Results as PDF
        </Button>
      </Container>
    </>
  );
};

export default ResultPage;
