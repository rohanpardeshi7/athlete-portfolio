import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: Mail, label: "Email", value: "coach@vikramrunning.com", href: "mailto:coach@vikramrunning.com" },
  { icon: MapPin, label: "Training Ground", value: "Jawaharlal Nehru Stadium, New Delhi" },
];

const socials = [
  {
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
    label: "Instagram",
    href: "https://instagram.com/",
  },
  {
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L8.32 13.617l-2.96-.924c-.64-.203-.658-.64.135-.954l11.57-4.458c.538-.196 1.006.128.832.941z" />
      </svg>
    ),
    label: "Strava",
    href: "https://strava.com/",
  },
  {
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    label: "LinkedIn",
    href: "https://linkedin.com/",
  },
];

const inputClass =
  "w-full px-4 py-3 bg-transparent border border-edge rounded-xl text-ink text-sm placeholder:text-ink-mute focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
    goal: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", phone: "", age: "", goal: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-bg-alt">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">
            Get In Touch
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mt-3">
            Start Your <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-8 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                    className="py-10 text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-gold flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-ink mb-3">
                      Inquiry received!
                    </h3>
                    <p className="text-ink-soft max-w-md mx-auto mb-8">
                      Thank you for your inquiry! Coach Vikram will get back to
                      you shortly.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="inline-flex items-center gap-2 px-6 py-3 border border-edge-strong rounded-xl text-ink font-semibold text-sm hover:border-accent hover:text-accent transition-all duration-300"
                    >
                      Send another message
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-ink-soft mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink-soft mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder="+91 XXXXX XXXXX"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-ink-soft mb-2">
                          Age
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={form.age}
                          onChange={handleChange}
                          required
                          min={8}
                          max={80}
                          placeholder="Your age"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink-soft mb-2">
                          Goal / Interest
                        </label>
                        <div className="relative">
                          <select
                            name="goal"
                            value={form.goal}
                            onChange={handleChange}
                            required
                            className={`${inputClass} appearance-none pr-10`}
                          >
                            <option value="">Select your goal</option>
                            <option value="marathon">Marathon Training</option>
                            <option value="youth">
                              Youth Fitness / School Sports
                            </option>
                            <option value="personal">
                              Personal Fitness &amp; Stamina
                            </option>
                            <option value="other">
                              Other / General Inquiry
                            </option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-ink-mute absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink-soft mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your fitness goals..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-accent to-accent-gold text-on-accent font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_var(--accent)]"
                    >
                      <Send className="w-4 h-4" />
                      Send Inquiry
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="glass rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 border border-edge">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-ink-mute text-xs mb-1">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-ink text-sm font-medium hover:text-accent transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-ink text-sm font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="glass rounded-2xl p-5">
              <p className="text-ink-mute text-xs mb-4">Follow the Journey</p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-xl border border-edge flex items-center justify-center text-ink-soft hover:text-white hover:bg-accent hover:border-accent transition-all duration-300 hover:-translate-y-1"
                  >
                    <s.icon />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}