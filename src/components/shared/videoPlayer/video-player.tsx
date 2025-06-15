"use client";

import React from "react";
import ReactPlayer from "react-player/youtube";

interface YoutubePlayerProps {
  url: string;
}

export default function VideoPlayer({ url }: YoutubePlayerProps) {
  return (
    <div className="w-full aspect-video">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        className="rounded-lg"
      />
    </div>
  );
}
