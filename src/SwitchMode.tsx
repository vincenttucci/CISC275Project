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
  const [switchMode, setSwitchMode] = useState<boolean>(localStorage.getItem("switchMode") === "true");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentSetting = localStorage.getItem("switchMode") === "true";
      setSwitchMode(currentSetting);
    }, 100); //fix not applying night mode on same page by checking every 100ms

    return () => clearInterval(interval);
  }, []);

  let pageBackgrounds: Record<string, {beachMode: string, MCMode: string}>={
    home:{beachMode:"/resort.gif" , MCMode:"/forest2.jpg"},
    detailedQuiz: {beachMode:"/BEACH.gif", MCMode:"pinkMine.gif"},
    contact:{beachMode:"/underwater3.jpg", MCMode:"/sunny.gif" },
    about: {beachMode:"beachHouse.jpg", MCMode:"pinkMinecraft.gif"}
  };

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
