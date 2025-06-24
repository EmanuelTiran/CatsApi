import React, { useState, useEffect } from "react";

export default function CatHeader() {
  const [displayText, setDisplayText] = useState("");
  const [showSubtext, setShowSubtext] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  
  const fullText = "🐾 Cat breeds around the world 🐾";
  const subtitleText = "Discover the wonderful breeds of cats, each with its own unique character and beauty.";
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Show subtitle after main text is complete
        setTimeout(() => {
          setShowSubtext(true);
          setShowCursor(false);
        }, 500);
      }
    }, 100); // Typing speed

    return () => clearInterval(typingInterval);
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent min-h-[4rem] flex items-center justify-center">
        {displayText}
        {showCursor && displayText.length < fullText.length && (
          <span className="animate-pulse text-blue-600 ml-1">|</span>
        )}
      </h1>
      
      <div className={`transition-all duration-1000 ease-out ${
        showSubtext 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-4'
      }`}>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {subtitleText}
        </p>
      </div>
    </div>
  );
}