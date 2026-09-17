"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type SitePreviewFrameProps = {
  url?: string;
  fallbackSrc?: string;
  alt: string;
  viewportWidth: number;
  viewportHeight: number;
  sizes?: string;
  lazy?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  /** Carica subito l’iframe (es. hero). Nel portfolio resta off: niente animazioni finché non passi sopra. */
  autoLive?: boolean;
};

export function SitePreviewFrame({
  url,
  fallbackSrc,
  alt,
  viewportWidth,
  viewportHeight,
  sizes,
  lazy = false,
  fetchPriority = "auto",
  autoLive = false,
}: SitePreviewFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.2);
  const [inView, setInView] = useState(!lazy);
  const [livePreview, setLivePreview] = useState(autoLive && !fallbackSrc);
  const [iframeFailed, setIframeFailed] = useState(false);

  const showIframe =
    Boolean(url) &&
    !iframeFailed &&
    !fallbackSrc &&
    livePreview &&
    (autoLive ? inView : true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setScale(el.clientWidth / viewportWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [viewportWidth]);

  useEffect(() => {
    if (!lazy || !autoLive) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [lazy, autoLive]);

  const enableLive = () => {
    if (!url || fallbackSrc) return;
    setLivePreview(true);
  };

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden bg-cream/5"
      onMouseEnter={autoLive ? undefined : enableLive}
      onFocus={autoLive ? undefined : enableLive}
      onTouchStart={autoLive ? undefined : enableLive}
    >
      {fallbackSrc ? (
        <Image
          src={fallbackSrc}
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          loading={lazy ? "lazy" : "eager"}
          fetchPriority={fetchPriority}
          decoding="async"
          className="object-cover object-top"
        />
      ) : null}

      {!fallbackSrc && !showIframe && url ? (
        <button
          type="button"
          onClick={enableLive}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-foreground/[0.04] px-4 text-center"
          aria-label={`Carica anteprima di ${alt}`}
        >
          <span className="font-display text-sm font-semibold tracking-tight text-foreground">
            {alt}
          </span>
          <span className="text-xs text-muted">Tocca per l’anteprima</span>
        </button>
      ) : null}

      {showIframe ? (
        <iframe
          src={url}
          title={alt}
          loading="lazy"
          tabIndex={-1}
          referrerPolicy="no-referrer"
          className="absolute top-0 left-0 origin-top-left border-0 bg-white"
          style={{
            width: viewportWidth,
            height: viewportHeight,
            transform: `scale(${scale})`,
            pointerEvents: "none",
          }}
          onError={() => setIframeFailed(true)}
        />
      ) : null}
    </div>
  );
}
