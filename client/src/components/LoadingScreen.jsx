import React, { useEffect, useState } from "react";

const LoadingScreen = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fade = setTimeout(() => setFadeOut(true), 1800);
    const hide = setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, 2200);

    return () => {
      clearTimeout(fade);
      clearTimeout(hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`loading-screen ${fadeOut ? "loading-fadeout" : ""}`}>

      {/* Background blobs */}
      <div className="ls-blob ls-blob-1"></div>
      <div className="ls-blob ls-blob-2"></div>

      {/* Content */}
      <div className="ls-content">

        {/* Blood drop animation */}
        <div className="ls-drop-wrapper">
          <svg
            viewBox="0 0 100 130"
            xmlns="http://www.w3.org/2000/svg"
            className="ls-drop"
          >
            <defs>
              <radialGradient id="lsGrad" cx="50%" cy="60%" r="50%">
                <stop offset="0%" stopColor="#ff3333" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#880000" stopOpacity="0.6" />
              </radialGradient>
            </defs>
            <path
              d="M50 5 C50 5 10 55 10 80 a40 40 0 0 0 80 0 C90 55 50 5 50 5 Z"
              fill="url(#lsGrad)"
            />
          </svg>
          <div className="ls-ping"></div>
          <div className="ls-ping ls-ping-2"></div>
        </div>

        {/* Logo */}
        <h1 className="ls-logo">
          Blood<span className="ls-accent">Link</span>
        </h1>

        {/* Tagline */}
        <p className="ls-tagline">Connecting donors. Saving lives.</p>

        {/* Progress bar */}
        <div className="ls-progress-bar">
          <div className="ls-progress-fill"></div>
        </div>

      </div>

    </div>
  );
};

export default LoadingScreen;