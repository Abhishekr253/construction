import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef();
  const overlayRef = useRef();
  const linksRef = useRef([]);

  const scrollTo = (id) => {
    closeMenu();
    setTimeout(() => {
      gsap.to(window, {
        duration: 1.6,
        scrollTo: { y: id, offsetY: 0 },
        ease: "power3.inOut",
      });
    }, 400); // wait for drawer to close before scrolling
  };

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    // Animate out
    gsap.to(drawerRef.current, {
      x: "100%",
      duration: 0.45,
      ease: "power3.inOut",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.out",
      onComplete: () => setMenuOpen(false),
    });
  };

  // Animate in whenever menuOpen becomes true
  useEffect(() => {
    if (!menuOpen) return;

    // Drawer slides in from right
    gsap.fromTo(
      drawerRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.5, ease: "power3.out" },
    );

    // Overlay fades in
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" },
    );

    // Nav links stagger in
    gsap.fromTo(
      linksRef.current.filter(Boolean),
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.07,
        delay: 0.15,
      },
    );
  }, [menuOpen]);

  const links = [
    { label: "Home", id: "#home" },
    { label: "About", id: "#about" },
    { label: "Projects", id: "#projects" },
    { label: "Contact", id: "#contact" },
  ];

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-[100] px-10 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("#home")} className="cursor-pointer">
            <h1 className="text-white text-2xl font-light tracking-wider">
              BuildX
            </h1>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10 text-white text-sm font-light">
            {links.slice(0, 3).map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="hover:text-white/50 transition duration-200"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="border border-white/40 px-5 py-2 rounded-full
                         hover:bg-white hover:text-black transition duration-300"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white text-2xl z-[110] relative"
            onClick={openMenu}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ─────────────────────────────── */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            ref={overlayRef}
            onClick={closeMenu}
            className="fixed inset-0 z-[520] bg-black/60 backdrop-blur-sm"
            style={{ opacity: 0 }}
          />

          {/* Drawer panel — slides from right */}
          <div
            ref={drawerRef}
            className="
fixed
top-0
right-0
z-[999]
h-dvh
w-full
max-w-none
bg-[#0d0d0d]
flex
flex-col
"
            style={{ transform: "translateX(100%)" }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-7 py-6 border-b border-white/10">
              <h1 className="text-white text-xl font-light tracking-wider">
                BuildX
              </h1>
              <button
                onClick={closeMenu}
                className="text-white/50 hover:text-white transition text-xl leading-none"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col flex-1 px-7 py-10 gap-2">
              {links.map(({ label, id }, i) => (
                <button
                  key={id}
                  ref={(el) => (linksRef.current[i] = el)}
                  onClick={() => scrollTo(id)}
                  className="text-left text-white/70 hover:text-white
                             text-2xl font-extralight tracking-tight
                             py-4 border-b border-white/[0.06]
                             transition duration-200"
                  style={{ opacity: 0 }}
                >
                  <span className="text-white/20 text-sm font-light mr-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {label}
                </button>
              ))}
            </div>

            {/* Drawer footer */}
            <div className="px-7 py-8 border-t border-white/10">
              <p className="text-white/20 text-[10px] uppercase tracking-[6px] font-light">
                © 2026 BuildX
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
