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
    <div className="h-screen w-screen bg-black overflow-hidden scanlines flicker crt-effect">
      <div className="content-container">
        <pre className="text-7xl mt-20 glow">
          :-)
        </pre>
        <ul className="list-none p-0 m-0 flex flex-col items-center">
          {options.map((option, index) => (
            <li
              key={option}
              className={`text-5xl ${selectedOption === index ? 'text-white glow' : 'text-green-400 glow'}`}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
