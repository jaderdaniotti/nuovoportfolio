"use client";

import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export function ContactSection() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = String(fd.get("subject") ?? "");
    const body = String(fd.get("body") ?? "");
    const addr = siteConfig.links.email.replace(/^mailto:/i, "");
    const url = `mailto:${addr}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  return (
    <section
      id="contatti"
      className="relative flex min-h-full w-full flex-col items-center justify-center bg-white px-6 py-20 lg:px-24"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Call to Action */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col gap-6 w-full"
        >
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-zinc-300" />
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
              Iniziamo
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 leading-tight">
            Pronto a <br className="hidden md:block"/>
            <span className="text-zinc-400">rinnovarti?</span>
          </h2>

          <p className="text-lg text-zinc-600 max-w-md">
            Parliamo del tuo prossimo progetto. Che sia un restyling o una nuova piattaforma, ti guiderò verso la soluzione migliore.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <a 
              href={siteConfig.links.email}
              className="group flex items-center gap-4 text-xl font-medium text-zinc-900 hover:text-zinc-600 transition-colors w-max"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 group-hover:bg-zinc-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              Mandami un'email
            </a>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full"
        >
          <div className="bg-zinc-50 p-8 md:p-12 rounded-3xl border border-zinc-100">
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-medium text-zinc-700 ml-1">
                  Oggetto
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Di cosa vogliamo parlare?"
                  className="w-full bg-white px-5 py-4 rounded-xl border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="body" className="text-sm font-medium text-zinc-700 ml-1">
                  Messaggio
                </label>
                <textarea
                  id="body"
                  name="body"
                  required
                  rows={5}
                  placeholder="Raccontami la tua idea o fai una domanda..."
                  className="w-full bg-white px-5 py-4 rounded-xl border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl bg-zinc-900 px-8 font-medium text-zinc-50 tracking-wide transition-all hover:bg-zinc-800 w-full mt-2"
              >
                Invia messaggio
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
