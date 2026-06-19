import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { projects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      const wrapper = sectionRef.current.querySelector(".about-wrapper");

      const scrollAmount = wrapper.scrollWidth - window.innerWidth;

      gsap.to(wrapper, {
        x: -scrollAmount,

        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,

          start: "top top",

          end: `+=${scrollAmount}`,

          scrub: 1,

          pin: true,
        },
      });
    }

    // Intro
    gsap.from(".about-title", {
      y: 80,
      opacity: 0,

      duration: 1.2,

      scrollTrigger: {
        trigger: ".intro",
        start: "top 85%",
      },
    });

    // Cards
    gsap.utils.toArray(".project-card").forEach((card) => {
      gsap.from(card, {
        y: 120,

        opacity: 0,

        scale: 0.95,

        duration: 1,

        ease: "power3.out",

        scrollTrigger: {
          trigger: card,

          start: "top 85%",
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="
      about-section
      bg-black
      text-white
      overflow-hidden
    "
    >
      <div
        className="
        about-wrapper
        font-theater

        flex
        flex-col
        lg:flex-row

        gap-6
        lg:gap-14

        px-5
        md:px-10
        lg:px-20

        py-16
        md:py-24

        lg:h-screen
        lg:items-center
      "
      >
        {/* INTRO */}
        <div
          className="
          intro

          w-full
          lg:flex-none
          lg:w-[40vw]

          mb-4
          lg:mb-0
        "
        >
          <p
            className="
            uppercase
            text-gray-500

            tracking-[6px]

            text-[10px]
            md:text-sm
          "
          >
            Projects
          </p>

          <h1
            className="
            about-title

            mt-4

            text-[42px]
            sm:text-[56px]
            md:text-6xl
            lg:text-7xl

            leading-[0.9]
            font-semibold
          "
          >
            Creating
            <br />
            Spaces
            <br />
            That Last
          </h1>

          <p
            className="
            mt-6

            text-gray-400

            text-sm
            md:text-base

            leading-7

            max-w-md
          "
          >
            From concept to completion we build memorable architectural
            experiences through precision and craftsmanship.
          </p>
        </div>

        {/* PROJECTS */}
        {projects.map((project, index) => (
          <div
            key={index}
            className="
            project-card

            w-full
            lg:flex-none
            lg:w-[45vw]

            h-[260px]
            sm:h-[340px]
            md:h-[480px]
            lg:h-[70vh]

            relative

            rounded-[22px]
            md:rounded-[30px]

            overflow-hidden
          "
          >
            <img
              src={project.src}
              alt={project.title}
              className="
              w-full
              h-full
              object-cover

              scale-[1.02]
            "
            />

            <div
              className="
              absolute
              inset-0

              bg-gradient-to-t
              from-black/90
              via-black/20
              to-transparent
            "
            />

            <div
              className="
              absolute
              bottom-0

              p-5
              md:p-8

              w-full
            "
            >
              <h2
                className="
                text-2xl
                sm:text-3xl
                md:text-5xl

                font-semibold

                leading-none
              "
              >
                {project.title}
              </h2>

              <p
                className="
                mt-2

                text-white/50

                text-xs
                md:text-sm

                uppercase

                tracking-[3px]
              "
              >
                {project.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;
