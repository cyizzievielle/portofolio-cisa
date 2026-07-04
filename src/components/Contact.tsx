import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Card } from "./ui/Card";
import { SectionTitle } from "./ui/SectionTitle";
import { Toast } from "./ui/Toast";
import { SocialLogo } from "./shared/SocialLogo";
import { contactLinks } from "../data/socials";

export function Contact() {
  const { dark } = useTheme();
  const [toast, setToast] = useState("");
  const muted = dark ? "text-rose-200/60" : "text-[#7a6188]";
  const softCard = dark
    ? "border-violet-300/15 bg-violet-400/8"
    : "border-rose-200/50 bg-rose-50/60";

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch("https://formspree.io/f/mbdwwjoj", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Message failed");
      form.reset();
      showToast("Message sent successfully ✨");
    } catch {
      showToast("Message failed to send");
    }
  };

  return (
    <>
      <section id="contact" className="reveal mx-auto max-w-6xl px-5 py-20">
        <SectionTitle label="Contact" title="Let's Connect" />

        <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {contactLinks.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target={item.title === "Email" ? undefined : "_blank"}
              rel={item.title === "Email" ? undefined : "noopener noreferrer"}
              className={`group relative overflow-hidden rounded-3xl border p-4 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(168,85,247,0.2)] active:scale-[0.97] sm:p-6 ${softCard}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-300/15 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div
                className={`relative mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl shadow-[0_14px_35px_rgba(168,85,247,0.15)] ring-1 transition duration-300 group-hover:scale-110 sm:h-14 sm:w-14 ${
                  dark
                    ? "bg-[#1a0f28] ring-violet-300/15"
                    : "bg-white ring-rose-200/50"
                }`}
              >
                <SocialLogo name={item.title} />
              </div>
              <h3 className="relative text-sm font-extrabold text-rose-500 sm:text-base">
                {item.title}
              </h3>
              <p className={`relative mt-1 truncate text-xs ${muted}`}>
                {item.value}
              </p>
            </a>
          ))}

          {/* Discord button */}
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText("@2cyi");
              showToast("Discord username copied ✨");
            }}
            className={`group relative overflow-hidden rounded-3xl border p-4 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(168,85,247,0.2)] active:scale-[0.97] sm:p-6 ${softCard} col-span-2 lg:col-span-1`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-300/15 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div
              className={`relative mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl shadow-[0_14px_35px_rgba(168,85,247,0.15)] ring-1 transition duration-300 group-hover:scale-110 sm:h-14 sm:w-14 ${
                dark
                  ? "bg-[#1a0f28] ring-violet-300/15"
                  : "bg-white ring-rose-200/50"
              }`}
            >
              <SocialLogo name="Discord" />
            </div>
            <h3 className="relative text-sm font-extrabold text-rose-500 sm:text-base">
              Discord
            </h3>
            <p className={`relative mt-1 text-xs ${muted}`}>
              @2cyi • click to copy
            </p>
          </button>
        </div>

        {/* Contact Form */}
        <Card className="mx-auto max-w-5xl">
          <div className="mb-7">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-rose-500">
              Message
            </span>
            <h3 className="mt-2 text-2xl font-extrabold bg-gradient-to-r from-rose-400 to-violet-500 bg-clip-text text-transparent">
              Send Message
            </h3>
            <p className={`mt-2 ${muted}`}>
              Feel free to send a message for collaboration, project discussion, or
              networking.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="name"
                required
                autoComplete="name"
                className={`rounded-2xl border p-4 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-violet-300/20 ${softCard}`}
                placeholder="Your Name"
              />
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className={`rounded-2xl border p-4 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-violet-300/20 ${softCard}`}
                placeholder="Your Email"
              />
            </div>
            <input
              type="hidden"
              name="_subject"
              value="New message from Portfolio Cisa"
            />
            <textarea
              name="message"
              required
              className={`min-h-40 rounded-2xl border p-4 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-violet-300/20 ${softCard}`}
              placeholder="Write your message..."
            />
            <button
              type="submit"
              className="w-fit rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-violet-500 px-8 py-3 font-bold text-white shadow-[0_14px_35px_rgba(168,85,247,0.3)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(168,85,247,0.4)]"
            >
              Send Message
            </button>
          </form>
        </Card>
      </section>

      <Toast message={toast} />
    </>
  );
}
