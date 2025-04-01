import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Form } from 'react-bootstrap';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  const [nightMode, setNightMode] = useState<boolean>(false); // for checking if night mode is active
  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  // Sets Night Mode on and off
  function nightModeButton(){
    setNightMode(!nightMode);
  }
  
  return (
    <div className={`App-wrapper ${nightMode ? 'night-mode' : ''}`}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <button className='Basic-Questions'>Basic Questions</button>
        <div>A more comprehensive quiz for students who want a more detailed response</div>
        <button className='Detailed-Questions'>Detailed Questions</button>
        <div>An easier quiz for students with less time</div>
        <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br />
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
      </div>
      <footer className="App-footer">
        <button onClick={nightModeButton}>Toggle Night Mode</button>
        <p>Vincent Tucci, Brooklyn Harden, Taylor Jenkins, Sam Mullaney</p>
      </footer>
    </div>
  );
}

export default App;