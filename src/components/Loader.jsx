// Loader.jsx
// Full-screen splash loader for BuildX Construction.
// White & black theme with structural/architectural design motifs.
// Fades out and unmounts when loading is complete.
// Usage:
//   1. import Loader from './components/Loader';
//   2. Add <Loader /> at the top of your App.jsx return — it unmounts itself automatically.

import { useState, useEffect } from "react";

export default function Loader() {
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let current = 0;

    function getDelay(val) {
      if (val < 30) return 25;
      if (val < 70) return 40;
      if (val < 90) return 55;
      return 20;
    }

    function tick() {
      current += 1;
      setPercent(current);
      if (current < 100) {
        setTimeout(tick, getDelay(current));
      } else {
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => setVisible(false), 900);
        }, 600);
      }
    }

    const startDelay = setTimeout(tick, 200);
    return () => clearTimeout(startDelay);
  }, []);

  if (!visible) return null;

  const getMessage = () => {
    if (percent < 35) return "Laying the foundation…";
    if (percent < 65) return "Raising the structure…";
    if (percent < 90) return "Finishing the details…";
    if (percent < 100) return "Almost ready…";
    return "Built to last. ▪";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .buildx-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #F5F5F0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: opacity 0.9s ease;
          overflow: hidden;
        }
        .buildx-loader.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        .loader-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .loader-h-line {
          position: absolute;
          height: 1px;
          background: rgba(0,0,0,0.06);
          left: 0;
          right: 0;
        }
        .loader-v-line {
          position: absolute;
          width: 1px;
          background: rgba(0,0,0,0.06);
          top: 0;
          bottom: 0;
        }

        .loader-corner {
          position: absolute;
          width: 36px;
          height: 36px;
          border-color: #111;
          border-style: solid;
        }
        .loader-corner.tl { top: 32px; left: 32px; border-width: 2px 0 0 2px; }
        .loader-corner.tr { top: 32px; right: 32px; border-width: 2px 2px 0 0; }
        .loader-corner.bl { bottom: 32px; left: 32px; border-width: 0 0 2px 2px; }
        .loader-corner.br { bottom: 32px; right: 32px; border-width: 0 2px 2px 0; }

        .loader-logo-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 4rem;
          animation: logoReveal 0.8s cubic-bezier(0.25,0.46,0.45,0.94) both;
          animation-delay: 0.15s;
        }
        @keyframes logoReveal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .loader-wordmark {
          display: flex;
          align-items: flex-end;
          gap: 0;
          line-height: 1;
        }
        .loader-wordmark-build {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(3.2rem, 10vw, 5.5rem);
          font-weight: 800;
          color: #111;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .loader-wordmark-x {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(3.2rem, 10vw, 5.5rem);
          font-weight: 300;
          color: #111;
          letter-spacing: -0.02em;
          line-height: 1;
          border-left: 3px solid #111;
          padding-left: 0.18em;
          margin-left: 0.12em;
        }

        .loader-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.35);
          font-weight: 500;
          margin-top: 0.7rem;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards;
          animation-delay: 0.75s;
        }

        .loader-divider {
          width: 0;
          height: 2px;
          background: #111;
          margin-top: 0.9rem;
          animation: expandLine 0.7s ease forwards;
          animation-delay: 0.5s;
        }
        @keyframes expandLine {
          to { width: 80px; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .loader-progress-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          width: min(300px, 65vw);
          opacity: 0;
          animation: fadeUp 0.7s ease forwards;
          animation-delay: 0.45s;
        }

        .loader-percent {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(3.5rem, 12vw, 6.5rem);
          font-weight: 700;
          color: #111;
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .loader-percent sup {
          font-size: 0.3em;
          font-weight: 400;
          vertical-align: super;
          color: rgba(0,0,0,0.4);
          letter-spacing: 0;
        }

        .loader-bar-track {
          width: 100%;
          height: 2px;
          background: rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }
        .loader-bar-fill {
          position: absolute;
          top: 0; left: 0;
          height: 100%;
          background: #111;
          transition: width 0.07s linear;
        }

        .loader-ticks {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .loader-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
          font-weight: 400;
          text-align: center;
          min-height: 1em;
        }

        .loader-tagline {
          position: absolute;
          bottom: 44px;
          left: 0;
          right: 0;
          text-align: center;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.2);
          font-weight: 400;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards;
          animation-delay: 1s;
        }

        @media (max-width: 480px) {
          .loader-corner { width: 22px; height: 22px; }
          .loader-corner.tl { top: 20px; left: 20px; }
          .loader-corner.tr { top: 20px; right: 20px; }
          .loader-corner.bl { bottom: 20px; left: 20px; }
          .loader-corner.br { bottom: 20px; right: 20px; }
        }
      `}</style>

      <div className={`buildx-loader ${fadeOut ? "fade-out" : ""}`}>

        {/* blueprint grid */}
        <div className="loader-grid-bg" />

        {/* cross-hair lines */}
        <div className="loader-h-line" style={{ top: "50%" }} />
        <div className="loader-v-line" style={{ left: "50%" }} />

        {/* corner brackets */}
        <div className="loader-corner tl" />
        <div className="loader-corner tr" />
        <div className="loader-corner bl" />
        <div className="loader-corner br" />

        {/* logo */}
        <div className="loader-logo-wrap">
          <div className="loader-wordmark">
            <span className="loader-wordmark-build">Build</span>
            <span className="loader-wordmark-x">X</span>
          </div>
          <div className="loader-divider" />
          <p className="loader-subtitle">Construction &amp; Infrastructure</p>
        </div>

        {/* progress */}
        <div className="loader-progress-wrap">
          <div className="loader-percent">
            {percent}<sup>%</sup>
          </div>

          <div style={{ width: "100%" }}>
            <div className="loader-ticks">
              {Array.from({ length: 21 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "1px",
                    height: i % 5 === 0 ? "10px" : "6px",
                    background: i * 5 <= percent ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.12)",
                    transition: "background 0.1s",
                  }}
                />
              ))}
            </div>
            <div className="loader-bar-track">
              <div className="loader-bar-fill" style={{ width: `${percent}%` }} />
            </div>
          </div>

          <p className="loader-label">{getMessage()}</p>
        </div>

        {/* bottom tagline */}
        <p className="loader-tagline">Building tomorrow, today</p>

      </div>
    </>
  );
}
