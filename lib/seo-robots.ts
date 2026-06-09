import type { Metadata } from "next";

export const indexableRobots: NonNullable<Metadata["robots"]> = {
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

export const noindexRobots: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
};
