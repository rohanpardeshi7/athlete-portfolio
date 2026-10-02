import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/+918871661819"
      target="_blank"
      rel=""
      className="group fixed bottom-6 right-6 z-50"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-green-500/40 animate-pulse-ring" />
      <span className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-transform duration-300 group-hover:scale-110">
        <MessageCircle className="w-6 h-6 text-white" />
      </span>
    </a>
  );
}
