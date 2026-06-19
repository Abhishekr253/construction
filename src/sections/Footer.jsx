import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaArrowRight,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef();

  useGSAP(
    () => {
      const q = (sel) => footerRef.current.querySelector(sel);
      const qa = (sel) => footerRef.current.querySelectorAll(sel);

      // CTA eyebrow
      gsap.from(q(".ft-eyebrow"), {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: q(".ft-eyebrow"),
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // CTA heading — each line staggers
      gsap.from(qa(".ft-headline-line"), {
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: q(".ft-headline"),
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      // CTA button
      gsap.from(q(".ft-btn"), {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.7,
        ease: "back.out(1.4)",
        delay: 0.4,
        scrollTrigger: {
          trigger: q(".ft-btn"),
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

      // Footer columns stagger
      gsap.from(qa(".ft-col"), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: q(".ft-grid"),
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      // Bottom bar
      gsap.from(q(".ft-bottom"), {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: q(".ft-bottom"),
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });

      window.addEventListener("load", () => ScrollTrigger.refresh());
    },
    { scope: footerRef },
  );

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative bg-[#0b0b0b] text-white overflow-hidden"
    >
      {/* ── TOP CTA ─────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-24">
          <p className="ft-eyebrow uppercase tracking-[8px] text-white/35 text-[10px] font-light">
            Let's Build
          </p>

          <h1
            className="ft-headline mt-6 leading-[0.88] font-extralight tracking-tight
                         text-[40px] sm:text-[58px] md:text-[86px]"
          >
            <span className="ft-headline-line block">Ready To</span>
            <span className="ft-headline-line block">Create</span>
            <span className="ft-headline-line block">Something</span>
            <span className="ft-headline-line block italic font-light">
              Exceptional?
            </span>
          </h1>

          <button
            className="ft-btn mt-10 flex items-center gap-3
                       px-6 py-3.5 rounded-full
                       bg-white text-black text-sm font-light tracking-wide
                       hover:scale-105 transition duration-300"
          >
            Start Your Project
            <FaArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* ── MAIN GRID ───────────────────────────── */}
      <div
        className="ft-grid max-w-7xl mx-auto px-6 md:px-16 py-16
                      grid lg:grid-cols-4 gap-12"
      >
        {/* Logo col */}
        <div className="ft-col">
          <h2 className="text-2xl font-extralight tracking-wider">BuildX</h2>
          <p className="mt-5 text-white/40 leading-7 text-[13px] font-light max-w-[220px]">
            Creating modern architecture and timeless spaces with precision and
            craftsmanship.
          </p>
        </div>

        {/* Navigation */}
        <div className="ft-col">
          <h4 className="uppercase tracking-[6px] text-white/30 text-[10px] font-light">
            Navigation
          </h4>
          <div className="mt-6 space-y-4 text-[13px] font-light text-white/60">
            {["Home", "About", "Projects", "Services"].map((l) => (
              <p
                key={l}
                className="hover:text-white transition duration-200 cursor-pointer"
              >
                {l}
              </p>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="ft-col">
          <h4 className="uppercase tracking-[6px] text-white/30 text-[10px] font-light">
            Contact
          </h4>
          <div className="mt-6 space-y-4 text-[13px] font-light text-white/60">
            <p>hello@buildx.com</p>
            <p>+91 98765 43210</p>
            <p>Calicut, Kerala</p>
          </div>
        </div>

        {/* Social */}
        <div className="ft-col">
          <h4 className="uppercase tracking-[6px] text-white/30 text-[10px] font-light">
            Follow
          </h4>
          <div className="mt-6 flex gap-3">
            {[
              { icon: <FaInstagram size={13} />, label: "Instagram" },
              { icon: <FaLinkedin size={13} />, label: "LinkedIn" },
              { icon: <FaFacebook size={13} />, label: "Facebook" },
            ].map(({ icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-white/10
                           flex items-center justify-center text-white/50
                           hover:bg-white hover:text-black transition duration-300"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ──────────────────────────── */}
      <div
        className="ft-bottom border-t border-white/10 py-6 px-6 md:px-16
                   text-[11px] font-light text-white/30
                   flex flex-col md:flex-row justify-between gap-4"
      >
        <p>© 2026 BuildX. All rights reserved.</p>
        <div className="flex gap-6">
          <p className="hover:text-white/60 transition cursor-pointer">
            Privacy
          </p>
          <p className="hover:text-white/60 transition cursor-pointer">Terms</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
