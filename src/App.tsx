import React, { useState } from 'react';
import './App.css';
// import { Button, Form } from 'react-bootstrap';
import HomePage from "./HomePage";

import DetailedQuiz from './DetailedQuiz';

import BasicQuestion from "./BasicQuestion";
import AboutPage from "./About";



function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');


  // const changeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setKey(event.target.value);
  // };


  const renderPage = () => {
    if (currentPage === 'home') {
      return <HomePage navigateTo={setCurrentPage} />;

    }else if (currentPage === 'detailedquiz') {
      return <DetailedQuiz navigateTo={setCurrentPage}/>


    } else if (currentPage === 'basicQuestion') {
      return <BasicQuestion navigateTo={setCurrentPage}/>;

    } else if (currentPage === 'about') {
      return <AboutPage navigateTo={setCurrentPage}/>;

    } else {
      return <div>404 Page Not Found</div>;
    }
  };

  return (
    <div className='App-wrapper'>
      {renderPage()}
    </div>
  );
    
};

export default App;