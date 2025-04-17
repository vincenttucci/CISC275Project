/*
 * The new nightmode code checks to see if night mode is enabled in local storage and applies 
 * the style using the wrapper feature.
 */

import React, { useEffect, useState } from 'react';

const NightModeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nightMode, setNightMode] = useState<boolean>(localStorage.getItem("nightMode") === "true");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentSetting = localStorage.getItem("nightMode") === "true";
      setNightMode(currentSetting);
    }, 100); //fix not applying night mode on same page by checking every 100ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`App-wrapper ${nightMode ? 'night-mode' : ''}`}
      style={{
        backgroundImage: nightMode ? 'url("/darkBG1.jpeg")' : 'url("/whiteBG1.jpeg")',
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
