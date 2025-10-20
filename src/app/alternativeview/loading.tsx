'use client';

import { useEffect, useState } from 'react';

export default function AlternativeViewLoading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to 100
    const duration = 2000; // 2 seconds
    const steps = 100;
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="crt-container">
      <div className="monitor-frame">
        <div className="crt-screen">
          <div className="crt-vignette" />
          <div className="crt-content loading-screen">
            <div className="loading-content">
              <div className="loading-title phosphor-amber">
                ╔═══════════════════════════════════════╗
                <br />
                ║     INITIALIZING SYSTEM...           ║
                <br />
                ╚═══════════════════════════════════════╝
              </div>

              <div className="loading-bar-container">
                <div className="loading-label phosphor-cyan">
                  LOADING SYSTEM [{progress}%]
                </div>
                <div className="pixel-progress-bar">
                  <div className="progress-border">
                    [
                    <div className="progress-fill" style={{ width: `${progress}%` }}>
                      <span className="progress-blocks">
                        {Array.from({ length: Math.floor(progress / 2.5) }).map((_, i) => (
                          <span key={i}>█</span>
                        ))}
                      </span>
                    </div>
                    <div className="progress-empty" style={{ width: `${100 - progress}%` }}>
                      {Array.from({ length: Math.floor((100 - progress) / 2.5) }).map((_, i) => (
                        <span key={i}>░</span>
                      ))}
                    </div>
                    ]
                  </div>
                </div>
              </div>

              <div className="loading-status phosphor-text">
                <div className="status-line">▸ Booting terminal interface...</div>
                <div className="status-line">▸ Loading file system...</div>
                <div className="status-line">▸ Establishing connection...</div>
                <div className="status-line blink">▸ Ready_</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .loading-screen {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
          font-family: 'VT323', monospace;
        }

        .loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
          max-width: 800px;
          padding: 2rem;
        }

        .loading-title {
          font-size: 2rem;
          text-align: center;
          line-height: 1.6;
          white-space: pre;
        }

        .loading-bar-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .loading-label {
          font-size: 1.875rem;
          text-align: center;
          letter-spacing: 0.1em;
        }

        .pixel-progress-bar {
          width: 100%;
        }

        .progress-border {
          display: flex;
          align-items: center;
          font-size: 1.875rem;
          color: #00ff00;
          text-shadow: 0 0 5px rgba(0, 255, 0, 0.8);
          gap: 0.25rem;
        }

        .progress-fill {
          display: inline-block;
          height: 100%;
        }

        .progress-empty {
          display: inline-block;
          height: 100%;
        }

        .progress-blocks,
        .progress-empty {
          display: inline-flex;
          letter-spacing: 0;
        }

        .progress-blocks {
          color: #00ff00;
          text-shadow: 0 0 8px rgba(0, 255, 0, 1);
        }

        .progress-empty {
          color: #004400;
        }

        .loading-status {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 1.875rem;
          width: 100%;
        }

        .status-line {
          animation: fadeInLine 0.5s ease-in;
        }

        .status-line:nth-child(1) {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .status-line:nth-child(2) {
          animation-delay: 0.6s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .status-line:nth-child(3) {
          animation-delay: 1s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .status-line:nth-child(4) {
          animation-delay: 1.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        @keyframes fadeInLine {
          to {
            opacity: 1;
          }
        }

        .blink {
          animation: fadeInLine 0.5s ease-in, blink 1s infinite;
          animation-delay: 1.4s, 1.9s;
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
