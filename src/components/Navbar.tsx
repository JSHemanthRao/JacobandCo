"use client";

import TransitionLink from "@/components/TransitionLink";
import Magnetic from "@/components/Magnetic";
import { useEffect, useState, useRef } from "react";
import { Menu, Search, X } from "lucide-react";

const links = [
  { name: "Timepieces", path: "/collection" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!headerRef.current) return;
      
      const scrolled = window.scrollY > 72;
      if (scrolled) {
        headerRef.current.classList.add("border-[#D4AF37]/15", "bg-black/75", "backdrop-blur-xl");
        headerRef.current.classList.remove("border-transparent", "bg-black/0", "backdrop-blur-0");
      } else {
        headerRef.current.classList.remove("border-[#D4AF37]/15", "bg-black/75", "backdrop-blur-xl");
        headerRef.current.classList.add("border-transparent", "bg-black/0", "backdrop-blur-0");
      }
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 border-transparent bg-black/0 backdrop-blur-0"
    >
      <div className="container mx-auto flex h-24 items-center justify-between px-6">
        <Magnetic intensity={0.1}>
          <TransitionLink href="/" className="group flex min-w-0 flex-col justify-center">
            <span className="font-serif text-xl uppercase tracking-[0.14em] text-white transition group-hover:text-[#D4AF37] md:text-2xl md:tracking-[0.2em]">
              Jacob & Co
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.36em] text-white/55">Geneve</span>
          </TransitionLink>
        </Magnetic>

        <nav className="hidden items-center gap-12 md:flex">
          {links.map((item) => (
            <Magnetic key={item.name} intensity={0.2}>
              <TransitionLink
                href={item.path}
                className="group relative block text-xs uppercase tracking-[0.24em] text-white/75 transition hover:text-[#D4AF37]"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-x-100" />
              </TransitionLink>
            </Magnetic>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Magnetic intensity={0.3}>
            <button
              type="button"
              aria-label="Search"
              className="grid size-11 place-items-center border border-white/10 text-white/70 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <Search size={17} />
            </button>
          </Magnetic>
          <Magnetic intensity={0.2}>
            <TransitionLink href="/contact" className="luxury-button px-6 py-3">
              <span>Inquire</span>
            </TransitionLink>
          </Magnetic>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="grid size-11 place-items-center border border-white/10 text-white md:hidden"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div
          className="animate-[fadeInUp_260ms_ease-out_both] border-t border-white/10 bg-black/95 px-6 py-8 md:hidden"
        >
          <div className="flex flex-col gap-7">
            {links.map((item) => (
              <TransitionLink
                key={item.name}
                href={item.path}
                className="text-lg uppercase tracking-[0.24em] text-white/80"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </TransitionLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
