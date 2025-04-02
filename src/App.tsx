import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import HomePage from "./HomePage";

const saveKeyData = "MYKEY";
let keyData = "";

const prevKey = localStorage.getItem(saveKeyData);
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [nightMode, setNightMode] = useState<boolean>(false);

  const handleSubmit = () => {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  };

  const changeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  const nightModeButton = () => {
    setNightMode(!nightMode);
  };

  const renderPage = () => {
    if (currentPage === 'home') {
      return <HomePage navigateTo={setCurrentPage} />;
    } else {
      return <div>404 Page Not Found</div>;
    }
  };

  return (
    <div className={`App-wrapper ${nightMode ? 'night-mode' : ''}`}>
      <div className="App">
        <header className="App-header">
          {/* Optional logo: <img src={logo} className="App-logo" alt="logo" /> */}
          <h1>Career Finder</h1>

          <Form>
            <Form.Label>API Key:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Insert API Key Here"
              onChange={changeKey}
            />
            <br />
            <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
          </Form>
        </header>

        <main>
          {renderPage()}
        </main>

        <div className="question-buttons">
          <button className='Basic-Questions'>Basic Questions</button>
          <p>A more comprehensive quiz for students who want a more detailed response</p>

          <button className='Detailed-Questions'>Detailed Questions</button>
          <p>An easier quiz for students with less time</p>
        </div>
      </div>

      <footer className="App-footer">
        <button onClick={nightModeButton}>Toggle Night Mode</button>
        <p>Vincent Tucci, Brooklyn Harden, Taylor Jenkins, Sam Mullaney</p>
      </footer>
    </div>
  );
}

export default App;