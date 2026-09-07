"use client";

import {
  useRef,
  useEffect,
  useState,
  useMemo,
  useId,
  type FC,
  type PointerEvent,
} from "react";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
}

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = "",
  speed = 2,
  className,
  curveAmount = 0,
  direction = "left",
  interactive = true,
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (
      (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + "\u00A0"
    );
  }, [marqueeText]);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<SVGTextElement | null>(null);
  const htmlMeasureRef = useRef<HTMLSpanElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [box, setBox] = useState({ w: 1440, h: 80 });
  const offsetRef = useRef(0);
  const uid = useId();
  const pathId = `curve-${uid.replace(/:/g, "")}`;
  const fontSize = Math.max(22, Math.round(box.h * 0.62));
  const pathY = box.h / 2;
  const pathD = `M0,${pathY} Q${box.w / 2},${pathY + curveAmount} ${box.w},${pathY}`;
  const isFlat = curveAmount === 0;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<"left" | "right">(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const totalText = textLength
    ? Array(Math.ceil((box.w * 2) / textLength) + 2)
        .fill(text)
        .join("")
    : text;
  const ready = spacing > 0;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        setBox({ w: width, h: height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (isFlat) {
      if (htmlMeasureRef.current) setSpacing(htmlMeasureRef.current.offsetWidth);
      return;
    }
    if (measureRef.current)
      setSpacing(measureRef.current.getComputedTextLength());
  }, [text, className, fontSize, box.w, box.h, isFlat]);

  const applyOffset = (value: number) => {
    offsetRef.current = value;
    if (textPathRef.current) {
      textPathRef.current.setAttribute("startOffset", `${value}px`);
    }
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${value}px,0,0)`;
    }
  };

  useEffect(() => {
    if (!spacing) return;
    applyOffset(-spacing);
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed;
        let newOffset = offsetRef.current + delta;
        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;
        applyOffset(newOffset);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    if (wrapRef.current) wrapRef.current.style.cursor = "grabbing";
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!interactive || !dragRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    let newOffset = offsetRef.current + dx;
    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;
    applyOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? "right" : "left";
    if (wrapRef.current) wrapRef.current.style.cursor = "grab";
  };

  const cursorStyle = interactive ? "grab" : "auto";

  const sharedPointer = {
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerLeave: endDrag,
  };

  if (isFlat) {
    return (
      <div
        ref={wrapRef}
        className="flex h-full w-full items-center overflow-hidden"
        style={{ visibility: ready ? "visible" : "hidden", cursor: cursorStyle }}
        {...sharedPointer}
      >
        <span
          ref={htmlMeasureRef}
          aria-hidden
          className="pointer-events-none invisible absolute whitespace-nowrap font-display font-bold uppercase leading-none"
          style={{ fontSize }}
        >
          {text}
        </span>
        <div
          ref={trackRef}
          className={`flex w-max items-center whitespace-nowrap font-display font-bold uppercase leading-none will-change-transform ${className ?? ""}`}
          style={{ fontSize }}
        >
          {totalText}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className="flex h-full w-full items-center justify-center"
      style={{ visibility: ready ? "visible" : "hidden", cursor: cursorStyle }}
      {...sharedPointer}
    >
      <svg
        className="block h-full w-full select-none overflow-hidden font-display font-bold uppercase leading-none"
        viewBox={`0 0 ${box.w} ${box.h}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ fontSize }}
      >
        <text
          ref={measureRef}
          xmlSpace="preserve"
          fontSize={fontSize}
          style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
        >
          {text}
        </text>
        <defs>
          <path
            ref={pathRef}
            id={pathId}
            d={pathD}
            fill="none"
            stroke="transparent"
          />
        </defs>
        {ready ? (
          <text
            xmlSpace="preserve"
            fontSize={fontSize}
            className={`fill-current ${className ?? ""}`}
          >
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset="0px"
              xmlSpace="preserve"
              dominantBaseline="middle"
            >
              {totalText}
            </textPath>
          </text>
        ) : null}
      </svg>
    </div>
  );
};

export default CurvedLoop;
