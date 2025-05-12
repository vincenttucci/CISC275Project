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
  // use session storage new so that when the user returns to website, they will start on home, and refreshing will keep them on the same page.
  const [currentPage, setCurrentPage] = useState<string>(() => {
    return sessionStorage.getItem('currentPage') || 'home';
  });

  const changePage = (page: string) => {
    setCurrentPage(page);
    sessionStorage.setItem('currentPage', page);
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
