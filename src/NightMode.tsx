/*
 * The new nightmode code checks to see if night mode is enabled in local storage and applies 
 * the style using the wrapper feature.
 */

import React, { useEffect, useState } from 'react';

interface nightModePageTracker{
  children: React.ReactNode;
  page:string;
}
const NightModeWrapper: React.FC<nightModePageTracker> = ({ children, page }) => {
  const [nightMode, setNightMode] = useState<boolean>(localStorage.getItem("nightMode") === "true");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentSetting = localStorage.getItem("nightMode") === "true";
      setNightMode(currentSetting);
    }, 100); //fix not applying night mode on same page by checking every 100ms

    return () => clearInterval(interval);
  }, []);

  let pageBackgrounds: Record<string, {beachMode: string, darkMode: string}>={
    home:{beachMode:"/resort.gif" , darkMode:"/forest2.jpg"},
    detailedQuiz: {beachMode:"/BEACH.gif", darkMode:"pinkMine.gif"},
    contact:{beachMode:"/underwater3.jpg", darkMode:"/sunny.gif" },
    about: {beachMode:"beachHouse.jpg", darkMode:"pinkMinecraft.gif"}
  };

  let pageBackground= pageBackgrounds[page]?.[nightMode? 'darkMode':'beachMode']
  return (
    <div
      className={`App-wrapper ${nightMode ? 'night-mode' : ''}`}
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

export default NightModeWrapper;
