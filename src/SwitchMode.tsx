/*
 * The new nightmode code checks to see if night mode is enabled in local storage and applies 
 * the style using the wrapper feature.
 */

import React, { useEffect, useState } from 'react';

interface switchModePageTracker{
  children: React.ReactNode;
  page:string;
}
const SwitchModeWrapper: React.FC<switchModePageTracker> = ({ children, page }) => {
  const [switchMode, setSwitchMode] = useState<boolean>(localStorage.getItem("switchMode") === "true");//to switch between beach and mc mode

  useEffect(() => {
    const interval = setInterval(() => {
      const currentSetting = localStorage.getItem("switchMode") === "true";
      setSwitchMode(currentSetting);
    }, 100); //fix not applying night mode on same page by checking every 100ms

    return () => clearInterval(interval);
  }, []);
//holds the backgrounds for each page and each mode on the page. These variables are also present in the switchmodewrapper on the other pages to conect them and give unique backgrounds
  let pageBackgrounds: Record<string, {beachMode: string, MCMode: string}>={
    home:{beachMode:"./public/resort.gif" , MCMode:"./public/forest2.jpg"},
    detailedQuiz: {beachMode:"./public/BEACH.gif", MCMode:"./public/pinkMine.gif"},
    contact:{beachMode:"./public/contactBeach.jpg", MCMode:"./public/sunny.gif" },
    about: {beachMode:"./public/beachHouse.jpg", MCMode:"./public/pinkMinecraft.gif"}
  };
//variable that is set as background image. Places correct background for correct mode
  let pageBackground= pageBackgrounds[page]?.[switchMode? 'MCMode':'beachMode']
  return (
    <div
      className={`App-wrapper ${switchMode ? 'night-mode' : ''}`}
      style={{
        backgroundImage: `url(${pageBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}
    >
      <div className="overlay"></div>
      {children}
    </div>
  );
};

export default SwitchModeWrapper;
