import React, { useState } from 'react';
import './App.css';
import HomePage from "./HomePage";
import DetailedQuiz from './DetailedQuiz';
import BasicQuestion from "./BasicQuestion";
import AboutPage from "./About";
import ResultsPage from "./Results";
import ContactPage from "./Contact";

/*
* When the user refreshes on homepage, the app refreshes homepage as is.
* Reloading quiz pages will reset the quiz progress.
* Reloading the ressults page will generate new results.
*/

function App() {
  // Load page from local storage, and if not found, default to homepage
  const [currentPage, setCurrentPage] = useState<string>(() => {
    return localStorage.getItem('currentPage') || 'home';
  });

  // When user switches pages, change the indicator in local storage
  const changePage = (page: string) => {
    setCurrentPage(page);
    localStorage.setItem('currentPage', page);
  };

  const renderPage = () => {
    if (currentPage === 'home') {
      return <HomePage navigateTo={changePage} />;
    } else if (currentPage === 'detailedquiz') {
      return <DetailedQuiz navigateTo={changePage} />;
    } else if (currentPage === 'basicQuestion') {
      return <BasicQuestion navigateTo={changePage} />;
    } else if (currentPage === 'contact') {
      return <ContactPage navigateTo={changePage} />;
    } else if (currentPage === 'about') {
      return <AboutPage navigateTo={changePage} />;
    } else if (currentPage === 'result') {
      return <ResultsPage navigateTo={changePage} />;
    } else {
      return <div>404 Page Not Found</div>; 
    }
  };

  return (
    <div className='App-wrapper'>
      {renderPage()}
    </div>
  );
}

export default App;
