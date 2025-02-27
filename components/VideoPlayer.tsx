"use client";

import YouTube, { YouTubeProps } from "react-youtube";

const VideoPlayer = ({ videoId }: { videoId: string }) => {
  const opts: YouTubeProps["opts"] = {
    height: "330",
    width: "560",
    playerVars: {
      autoplay: 1,
      modestbranding: 1, // Hides YouTube logo
      rel: 0, // Prevents showing related videos
      disablekb: 1, // Disables keyboard controls
      fs: 1, // Enables fullscreen button
      enablejsapi: 1, // Allows JavaScript API (needed for some controls)
    },
  };

  return (
    <div className="flex justify-center items-center">
      <YouTube videoId={videoId} opts={opts} className="rounded-lg shadow-lg" />
    </div>
  );
};

export default VideoPlayer;