import type { CSSProperties, ReactNode } from "react";

const cardStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: "#0A0C00",
  color: "#F6F5F3",
  padding: 72,
};

const eyebrowStyle: CSSProperties = {
  display: "flex",
  fontSize: 22,
  letterSpacing: 4,
  color: "#E3FF04",
};

const titleStyle: CSSProperties = {
  display: "flex",
  fontSize: 64,
  fontWeight: 700,
  letterSpacing: -2,
  lineHeight: 1.1,
};

const subtitleStyle: CSSProperties = {
  display: "flex",
  marginTop: 20,
  fontSize: 30,
  color: "#F6F5F3",
  opacity: 0.85,
  lineHeight: 1.3,
};

export function OpenGraphCard({
  eyebrow = "FREELANCER · UDINE",
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
}): ReactNode {
  return (
    <div style={cardStyle}>
      <div style={eyebrowStyle}>{eyebrow}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={titleStyle}>{title}</div>
        <div style={subtitleStyle}>{subtitle}</div>
      </div>
    </div>
  );
}
