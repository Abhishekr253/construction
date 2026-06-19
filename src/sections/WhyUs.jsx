import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function WhyUs() {
  const sectionRef = useRef();

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);

      gsap.from(q(".why-label"), {
        opacity: 0,
        y: 20,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.from(q(".why-title"), {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(q(".why-card"), {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: q(".why-grid")[0],
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef },
  );

  const items = [
    {
      number: "01",
      title: "Architectural Precision",
      text: "Designed with attention to structure and detail.",
    },
    {
      number: "02",
      title: "Sustainable Building",
      text: "Built for longevity and lower environmental impact.",
    },
    {
      number: "03",
      title: "Proven Experience",
      text: "Years of delivering memorable spaces.",
    },
    {
      number: "04",
      title: "End-to-End Delivery",
      text: "One team from concept to completion.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="
      bg-black
      text-white
      py-20 md:py-32
      overflow-hidden
      "
    >
      <div className="max-w-7xl mx-auto px-5 md:px-16">
        {/* Label */}
        <p
          className="
          why-label
          uppercase
          tracking-[6px] md:tracking-[10px]
          text-[10px] md:text-sm
          text-white/35
          "
        >
          Why Us
        </p>

        {/* Heading */}
        <h1
          className="
          why-title

          mt-5 md:mt-8

          text-[42px]
          sm:text-[56px]
          md:text-[100px]

          leading-[0.92]
          font-extralight
        "
        >
          Built To
          <br />
          Inspire
        </h1>

        {/* Cards */}
        <div
          className="
          why-grid

          mt-14 md:mt-28

          grid
          grid-cols-1
          md:grid-cols-2

          gap-4 md:gap-8
          "
        >
          {items.map((item) => (
            <div
              key={item.number}
              className="
              why-card

              rounded-[24px]
              md:rounded-[32px]

              border
              border-white/8

              bg-white/[0.02]

              p-6
              md:p-10
              "
            >
              <span
                className="
                text-[10px]
                md:text-sm

                tracking-[5px]
                md:tracking-[8px]

                text-white/25
              "
              >
                {item.number}
              </span>

              <h2
                className="
                mt-5

                text-[22px]
                md:text-[34px]

                font-light
                leading-tight
                "
              >
                {item.title}
              </h2>

              <p
                className="
                mt-4

                text-sm
                md:text-base

                leading-7
                text-white/50
                "
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
