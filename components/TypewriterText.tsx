"use client";
import { useState, useEffect } from "react";

export function TypewriterText({ text, speed = 40 }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <p className="text-lg md:text-xl italic text-green-100">{displayedText}</p>;
}
