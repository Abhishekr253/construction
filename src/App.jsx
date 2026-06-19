import Hero from "./sections/Hero";
import About from "./sections/About";

import { useGSAP } from "@gsap/react";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Project from "./sections/Project";
import Loader from "./components/Loader";
import WhyUs from "./sections/WhyUs";
import Footer from "./sections/Footer";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  useGSAP(() => {
    ScrollSmoother.get()?.kill();

    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",

      smooth: 2,
      effects: true,

      smoothTouch: 0.1,
    });

    ScrollTrigger.refresh();
  });

  return (
    <div id="smooth-wrapper">
      <Loader />

      <div id="smooth-content">
        <Hero />

        <About />

        <Project />

        <WhyUs />

        <Footer />
      </div>
    </div>
  );
}

export default App;
