import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const navbarRef = useRef();
  const videoRef = useRef();
  const contentRef = useRef();
  const btnRef = useRef();

  const startedRef = useRef(false);
  const revealedRef = useRef(false);

  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
  const mm = gsap.matchMedia();

  mm.add(
    {
      mobile: "(max-width:768px)",
      desktop: "(min-width:769px)",
    },
    (context) => {
      const { mobile } = context.conditions;

      const trigger = ScrollTrigger.create({
        trigger: ".hero-wrapper",
        start: "top top",
        end: mobile ? "+=400" : "+=1600",
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
      });

      gsap.set(navbarRef.current, {
        opacity: 0,
        y: -60,
      });

      gsap.set(contentRef.current, {
        opacity: 0,
        y: 60,
      });

      const video = videoRef.current;

      if (!video) return;

      // keep reference available for cleanup
      let startDesktop = null;

      // DESKTOP → scroll starts video
      if (!mobile) {
        startDesktop = () => {
          if (startedRef.current) return;

          startedRef.current = true;

          setStarted(true);

          video.play();

          window.removeEventListener(
            "wheel",
            startDesktop
          );

          window.removeEventListener(
            "touchmove",
            startDesktop
          );
        };

        window.addEventListener(
          "wheel",
          startDesktop,
          { passive: true }
        );

        window.addEventListener(
          "touchmove",
          startDesktop,
          { passive: true }
        );
      }

      const monitor = () => {
        if (!video.duration) return;

        const progress =
          video.currentTime / video.duration;

        if (
          progress > 0.82 &&
          !revealedRef.current
        ) {
          revealedRef.current = true;

          gsap.to(navbarRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
          });

          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.4,
          });
        }
      };

      const complete = () => {
        setEnded(true);

        gsap.to(contentRef.current, {
          y: -60,
          duration: 1.2,
        });

        ScrollTrigger.refresh();
      };

      video.addEventListener(
        "timeupdate",
        monitor
      );

      video.addEventListener(
        "ended",
        complete
      );

      return () => {
        trigger.kill();

        video.removeEventListener(
          "timeupdate",
          monitor
        );

        video.removeEventListener(
          "ended",
          complete
        );

        if (startDesktop) {
          window.removeEventListener(
            "wheel",
            startDesktop
          );

          window.removeEventListener(
            "touchmove",
            startDesktop
          );
        }
      };
    }
  );

  return () => {
    mm.revert();
  };
}, []);

  const handleStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    setStarted(true);

    // Animate button out
    gsap.to(btnRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.9,
      duration: 0.5,
      ease: "power2.in",
    });

    videoRef.current?.play();
  };

  return (
    <section id="home" className="hero-wrapper relative z-10">
      <div className="relative h-screen overflow-hidden">
        {/* VIDEO */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/construction.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50" />

        {/* NAVBAR */}
        <div ref={navbarRef} className="absolute top-0 left-0 w-full z-[100]">
          <Navbar />
        </div>

        {/* ── PLAY BUTTON — shown before video starts ─── */}
        {!started && (
          <div
            ref={btnRef}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {/* Logo mark — minimal on mobile */}
            <p
              className="uppercase tracking-[6px] md:tracking-[10px] text-white/40
                          text-[9px] md:text-[11px] font-light"
            >
              BuildX — Construction Excellence
            </p>

            {/* Play button */}
            <button
              onClick={handleStart}
              className="group relative flex items-center justify-center
                         w-16 h-16 md:w-20 md:h-20
                         rounded-full border border-white/30
                         hover:border-white/60 transition duration-300"
            >
              {/* Pulse ring */}
              <span
                className="absolute inset-0 rounded-full border border-white/10
                               animate-ping"
              />
              {/* Triangle play icon */}
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-5 h-5 md:w-6 md:h-6 translate-x-0.5 opacity-80
                           group-hover:opacity-100 transition"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <p className="text-white/30 text-[10px] md:text-xs font-light tracking-widest uppercase">
              Tap to begin
            </p>
          </div>
        )}

        {/* HERO CONTENT — revealed after video */}
        <div
          ref={contentRef}
          className="relative z-20 h-full flex items-end md:items-center
                     px-5 md:px-14 lg:px-24 pb-24 md:pb-0"
        >
          <div className="max-w-5xl">
            <p
              className="uppercase text-white/50 tracking-[6px] md:tracking-[8px]
                          text-[9px] md:text-xs mb-4 md:mb-6 font-light"
            >
              Construction Excellence
            </p>
            <h1
              className="text-white font-extralight leading-[0.9] tracking-tight
                           text-4xl sm:text-5xl md:text-7xl lg:text-8xl"
            >
              Building
              <br />
              Tomorrow's
              <br />
              <span className="font-light italic">Landmarks</span>
            </h1>
            <p
              className="mt-4 md:mt-6 text-xs md:text-base text-white/40
                          max-w-xs md:max-w-md font-light leading-6 md:leading-7"
            >
              Transforming construction into iconic architectural experiences.
            </p>
            <button
              className="mt-6 md:mt-10 px-5 md:px-6 py-2.5 md:py-3
                         bg-white text-black rounded-full
                         text-xs md:text-sm font-light
                         hover:scale-105 transition duration-300"
            >
              Explore Projects
            </button>
          </div>
        </div>

        {/* SCROLL HINT — after video ends */}
        {ended && (
          <div className="absolute bottom-6 md:bottom-10 w-full text-center text-white z-50">
            <p
              className="animate-bounce text-[10px] md:text-sm font-light
                          tracking-[6px] md:tracking-widest text-white/40 uppercase"
            >
              Scroll to explore
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
