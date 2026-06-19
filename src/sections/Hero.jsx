import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

            window.removeEventListener("wheel", startDesktop);

            window.removeEventListener("touchmove", startDesktop);
          };

          window.addEventListener("wheel", startDesktop, { passive: true });

          window.addEventListener("touchmove", startDesktop, { passive: true });
        }

        const monitor = () => {
          if (!video.duration) return;

          const progress = video.currentTime / video.duration;

          if (progress > 0.82 && !revealedRef.current) {
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

        video.addEventListener("timeupdate", monitor);

        video.addEventListener("ended", complete);

        return () => {
          trigger.kill();

          video.removeEventListener("timeupdate", monitor);

          video.removeEventListener("ended", complete);

          if (startDesktop) {
            window.removeEventListener("wheel", startDesktop);

            window.removeEventListener("touchmove", startDesktop);
          }
        };
      },
    );

    return () => {
      mm.revert();
    };
  }, []);

  const goToProjects = () => {
  gsap.to(window, {
    duration: 1.8,
    scrollTo: {
      y: "#projects",
      offsetY: 0,
    },
    ease: "power3.inOut",
  });
};

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
          className="
absolute inset-0
w-full h-full
object-cover

object-center
md:object-center
"
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
            className="
      absolute inset-0 z-40
      flex flex-col items-center justify-center
      md:hidden
      bg-black/20 backdrop-blur-[2px]
    "
          >
            {/* Top Label */}
            <div className="overflow-hidden">
              <p
                className="
          animate-fadeUp
          uppercase
          tracking-[10px]
          text-[10px]
          text-white/55
          font-light
        "
              >
                BuildX
              </p>
            </div>

            {/* PLAY BUTTON */}
            <button
              onClick={handleStart}
              className="
        group
        relative
        mt-8
        flex items-center justify-center
        w-24 h-24
      "
            >
              {/* Glow */}
              <div
                className="
          absolute inset-0
          rounded-full
          bg-white/10
          blur-2xl
          scale-125
          animate-pulse
        "
              />

              {/* Rotating Ring */}
              <div
                className="
          absolute inset-0
          rounded-full
          border border-white/15
          animate-[spin_10s_linear_infinite]
        "
              />

              {/* Secondary Ring */}
              <div
                className="
          absolute inset-[6px]
          rounded-full
          border border-white/25
          animate-[pulse_3s_ease-in-out_infinite]
        "
              />

              {/* Main Circle */}
              <div
                className="
          relative
          w-20 h-20
          rounded-full
          bg-white/10
          backdrop-blur-xl
          border border-white/30

          flex items-center justify-center

          transition-all duration-500
          group-active:scale-90
          group-hover:scale-105
        "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="white"
                  className="
            w-8 h-8
            translate-x-[2px]
            opacity-90
            transition
            group-hover:scale-110
          "
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>

            {/* Bottom Text */}
            <div className="mt-10 text-center">
              <p
                className="
          text-white/80
          text-[11px]
          uppercase
          tracking-[8px]
          font-light
          animate-pulse
        "
              >
                Tap To Begin
              </p>

              <p
                className="
          mt-2
          text-white/35
          text-[11px]
        "
              >
                Experience the journey
              </p>
            </div>
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
            onClick={goToProjects}
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
