import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Spinner, Card, Button } from 'react-bootstrap';

interface ResultPageProps {
  navigateTo: (page: string) => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ navigateTo }) => {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
  const [jobSuggestions, setJobSuggestions] = useState<string[]>([]);
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

          //need a bit more researrch on '/\d+\.\s/' like why did that work and what initally is it?
          const jobs = text.split(/\d+\.\s/).filter((entry: string) => entry.trim() !== "");
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
                {jobSuggestions.map((job: string, index: React.Key | null | undefined) => (
                  <li key={index} className='mb-3'>{job.trim()}</li>
                ))}
            </ul>
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
      </Container>
      </div>
    </>
  );
};

export default ResultPage;
