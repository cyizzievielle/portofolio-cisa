import { useEffect } from "react";

export function useScrollSpy() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPos = window.scrollY + 120;

      sections.forEach((sec) => {
        if (sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
          const id = sec.getAttribute("id");
          document.querySelectorAll("nav a").forEach((a) => {
            a.classList.remove("text-rose-500");
            if (a.getAttribute("href") === `#${id}`) {
              a.classList.add("text-rose-500");
            }
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
