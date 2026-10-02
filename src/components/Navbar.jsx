import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Trophy, Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Achievements", href: "#achievements" },
  { name: "Coaching", href: "#coaching" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const { theme, cycleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y < 240) setActiveLink("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 nav-shell ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-gold flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-[8deg]">
              <Trophy className="w-5 h-5 text-white" />
            </span>
            <span className="font-heading font-bold text-lg text-ink">
              Pankaj <span className="text-gradient">Pardeshi</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  activeLink === link.href
                    ? "text-ink"
                    : "text-ink-mute hover:text-ink"
                }`}
              >
                {link.name}
                {activeLink === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 w-full h-0.5 rounded-full bg-gradient-to-r from-accent to-accent-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}

            {/* Desktop Theme toggle: Direct 1-Click Toggle */}
            <button
              type="button"
              onClick={cycleTheme}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-ink-soft hover:text-accent transition-all duration-200 cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            <a
              href="#coaching"
              className="px-5 py-2.5 bg-gradient-to-r from-accent to-accent-gold text-on-accent text-sm font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_var(--accent)]"
            >
              Join Coaching
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={cycleTheme}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-ink-soft cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-ink-soft hover:text-ink p-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-bg border-t border-edge"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeLink === link.href
                      ? "text-accent bg-card"
                      : "text-ink-soft hover:text-ink hover:bg-card"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              <a
                href="#coaching"
                onClick={() => setIsOpen(false)}
                className="block text-center mt-3 px-5 py-3 bg-gradient-to-r from-accent to-accent-gold text-on-accent font-semibold rounded-xl"
              >
                Join Coaching
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}