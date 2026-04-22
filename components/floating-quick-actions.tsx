"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";


const THEME_STORAGE_KEY = "theme-preference";

export function FloatingQuickActions() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") {
      return stored === "dark";
    }
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
  };

  return (
    <>
      <div className="pointer-events-auto fixed bottom-4 left-4 z-1100">
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/95 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-700 shadow-sm backdrop-blur transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Cambia tema"
          title="Cambia tema"
        >
          <span>Theme</span>
          <span
            className={`inline-flex h-5 w-10 items-center rounded-full px-1 transition ${
              isDark ? "bg-zinc-700" : "bg-zinc-200"
            }`}
            aria-hidden
          >
            <span
              className={`inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-zinc-700 shadow transition ${
                isDark ? "translate-x-4" : "translate-x-0"
              }`}
            >
              {isDark ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
            </span>
          </span>
        </button>
      </div>

      <a
        href="https://wa.me/393513152008"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Scrivimi su WhatsApp"
        title="Scrivimi su WhatsApp"
        className="pointer-events-auto fixed bottom-4 right-4 z-1100 inline-flex h-12 w-12 items-center justify-center rounded-full border-white border-2 dark:border-zinc-700 text-white shadow-lg transition hover:scale-105 "
      >
        <svg
          viewBox="0 0 48 48"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#000000"
          className="h-7 w-7"
          aria-hidden
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
          <g id="SVGRepo_iconCarrier">
            <title>Whatsapp-color</title>
            <desc>Created with Sketch.</desc>
            <defs />
            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Color-" transform="translate(-700.000000, -360.000000)" fill="#67C15E">
                <path
                  id="Whatsapp"
                  d="M723.993033,360 C710.762252,360 700,370.765287 700,383.999801 C700,389.248451 701.692661,394.116025 704.570026,398.066947 L701.579605,406.983798 L710.804449,404.035539 C714.598605,406.546975 719.126434,408 724.006967,408 C737.237748,408 748,397.234315 748,384.000199 C748,370.765685 737.237748,360.000398 724.006967,360.000398 L723.993033,360.000398 L723.993033,360 Z M717.29285,372.190836 C716.827488,371.07628 716.474784,371.034071 715.769774,371.005401 C715.529728,370.991464 715.262214,370.977527 714.96564,370.977527 C714.04845,370.977527 713.089462,371.245514 712.511043,371.838033 C711.806033,372.557577 710.056843,374.23638 710.056843,377.679202 C710.056843,381.122023 712.567571,384.451756 712.905944,384.917648 C713.258648,385.382743 717.800808,392.55031 724.853297,395.471492 C730.368379,397.757149 732.00491,397.545307 733.260074,397.27732 C735.093658,396.882308 737.393002,395.527239 737.971421,393.891043 C738.54984,392.25405 738.54984,390.857171 738.380255,390.560912 C738.211068,390.264652 737.745308,390.095816 737.040298,389.742615 C736.335288,389.389811 732.90737,387.696673 732.25849,387.470894 C731.623543,387.231179 731.017259,387.315995 730.537963,387.99333 C729.860819,388.938653 729.198006,389.89831 728.661785,390.476494 C728.238619,390.928051 727.547144,390.984595 726.969123,390.744481 C726.193254,390.420348 724.021298,389.657798 721.340985,387.273388 C719.267356,385.42535 717.856938,383.125756 717.448104,382.434484 C717.038871,381.729275 717.405907,381.319529 717.729948,380.938852 C718.082653,380.501232 718.421026,380.191036 718.77373,379.781688 C719.126434,379.372738 719.323884,379.160897 719.549599,378.681068 C719.789645,378.215575 719.62006,377.735746 719.450874,377.382942 C719.281687,377.030139 717.871269,373.587317 717.29285,372.190836 Z"
                />
              </g>
            </g>
          </g>
        </svg>
      </a>
    </>
  );
}
