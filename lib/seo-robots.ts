import type { Metadata } from "next";

export const indexableRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const noindexRobots: Metadata["robots"] = {
  index: false,
  follow: true,
};
