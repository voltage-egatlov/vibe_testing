"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(0);
  const options = ['About', 'Projects', 'Fun'];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        setSelectedOption((prevOption) => (prevOption - 1 + options.length) % options.length);
      } else if (event.key === 'ArrowDown') {
        setSelectedOption((prevOption) => (prevOption + 1) % options.length);
      } else if (event.key === 'Enter') {
        const path = `/${options[selectedOption].toLowerCase()}`;
        window.location.href = path;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedOption, options]);

  return (
    <div className="h-screen w-screen bg-black text-green-400 scanlines flicker">
      <pre className="text-3xl mt-10">
        :-)
      </pre>
      <ul className="list-none p-0 m-0 flex flex-col items-center">
        {options.map((option, index) => (
          <li
            key={option}
            className={`text-lg ${selectedOption === index ? 'text-white' : 'text-green-400'}`}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
