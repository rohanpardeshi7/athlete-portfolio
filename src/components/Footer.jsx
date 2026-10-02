import { Trophy, Heart, ArrowUp } from "lucide-react";

const footerLinks = [
  { name: "About", href: "#about" },
  { name: "Achievements", href: "#achievements" },
  { name: "Coaching", href: "#coaching" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-edge py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-gold flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Trophy className="w-5 h-5 text-white" />
            </span>
            <span className="font-heading font-bold text-lg text-ink">
              Pankaj <span className="text-gradient">Pardeshi</span>
            </span>
          </a>

          {/* Quick links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-ink-mute hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Back to top */}
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-sm text-ink-soft hover:text-accent transition-colors"
            aria-label="Back to top"
          >
            <span className="w-9 h-9 rounded-full border border-edge-strong flex items-center justify-center transition-all duration-300 group-hover:border-accent group-hover:-translate-y-1">
              <ArrowUp className="w-4 h-4" />
            </span>
            Back to top
          </a>
        </div>

        <div className="mt-10 pt-8 border-t border-edge flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ink-mute text-sm flex items-center gap-1">
            © {new Date().getFullYear()} Pankaj Pardeshi. Made with{" "}
            <Heart className="w-3.5 h-3.5 text-accent fill-accent" /> for
            athletes everywhere.
          </p>
          <p className="text-ink-mute text-xs tracking-wide">
            Endurance · Discipline · Victory
          </p>
        </div>
      </div>
    </footer>
  );
}
