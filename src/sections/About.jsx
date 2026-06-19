import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef();

  useGSAP(
    () => {
      const heading = sectionRef.current.querySelector(".about-heading");
      const eyebrow = sectionRef.current.querySelector(".about-eyebrow");
      const texts = sectionRef.current.querySelectorAll(".about-text");
      const metrics = sectionRef.current.querySelectorAll(".metric");

      // Parallax zoom on background video
      gsap.fromTo(
        sectionRef.current.querySelector(".about-bg"),
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.from(eyebrow, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: eyebrow,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(heading, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(texts, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: {
          trigger: texts[0],
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(metrics, {
        y: 60,
        opacity: 0,
        scale: 0.88,
        duration: 0.85,
        ease: "back.out(1.6)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current.querySelector(".metrics"),
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      window.addEventListener("load", () => ScrollTrigger.refresh());
    },
    { scope: sectionRef },
  );

  const stats = [
    { value: "250+", label: "Projects Delivered" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Industry Awards" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="sticky top-0 z-50 bg-[#f8f6f1]"
    >
      <div
        className="
      about-panel
      relative
      overflow-hidden
      min-h-screen

      rounded-t-[24px]
      md:rounded-t-[40px]

      shadow-[0_-20px_40px_rgba(0,0,0,0.12)]
      md:shadow-[0_-40px_80px_rgba(0,0,0,0.25)]
    "
      >
        {/* BG VIDEO */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="
          about-bg
          absolute
          inset-0
          w-full
          h-full
          object-cover

          opacity-[0.03]
          md:opacity-[0.06]

          pointer-events-none
        "
        >
          <source src="/videos/construction_1.mp4" type="video/mp4" />
        </video>

        {/* CONTENT */}
        <div
          className="
          relative
          z-10

          max-w-7xl
          mx-auto

          px-5
          md:px-16

          py-20
          md:py-32
        "
        >
          {/* Label */}
          <p
            className="
            about-eyebrow
            uppercase

            tracking-[6px]
            md:tracking-[10px]

            text-gray-400

            text-[10px]
            md:text-sm
          "
          >
            About Us
          </p>

          {/* Heading */}
          <h1
            className="
            about-heading

            mt-5

            text-[42px]
            sm:text-[56px]
            md:text-[110px]

            leading-[0.9]

            font-semibold
          "
          >
            Crafting
            <br />
            Spaces
            <br />
            That Last
          </h1>

          {/* Text */}
          <div
            className="
            mt-12
            md:mt-24

            grid
            grid-cols-1
            lg:grid-cols-2

            gap-8
            md:gap-16
          "
          >
            <p
              className="
              about-text

              text-sm
              md:text-lg

              leading-8
              md:leading-[2]

              text-gray-600
            "
            >
              Every structure begins as a vision and becomes reality through
              planning, engineering and expert execution.
            </p>

            <p
              className="
              about-text

              text-sm
              md:text-lg

              leading-8
              md:leading-[2]

              text-gray-600
            "
            >
              From concept to completion, our process focuses on craftsmanship,
              sustainability and memorable environments.
            </p>
          </div>

          {/* Stats */}
          <div
            className="
            metrics

            mt-16
            md:mt-36

            grid

            grid-cols-2
            lg:grid-cols-4

            gap-8
            md:gap-16

            pb-10
            md:pb-32
          "
          >
            {stats.map((item) => (
              <div key={item.value} className="metric">
                <h2
                  className="
                  text-3xl
                  md:text-6xl

                  font-semibold
                "
                >
                  {item.value}
                </h2>

                <p
                  className="
                  mt-2
                  md:mt-4

                  text-[10px]
                  md:text-sm

                  tracking-[3px]
                  md:tracking-widest

                  uppercase

                  text-gray-400
                "
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
