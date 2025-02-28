"use client";

import YouTube, { YouTubeProps } from "react-youtube";

const VideoPlayer = ({ videoId }: { videoId: string }) => {
  const opts: YouTubeProps["opts"] = {
    height: "351",
    width: "560",
    playerVars: {
      autoplay: 0,
      modestbranding: 1, // Hides YouTube logo
      rel: 0, // Prevents showing related videos
      disablekb: 1, // Disables keyboard controls
      fs: 1, // Enables fullscreen button
      enablejsapi: 1, // Allows JavaScript API (needed for some controls)
    },
  };

  return (
    <div className="flex">
      {/* Ensuring responsive width with a max width of 560px */}
      <div className="w-full max-w-[560px] sm:max-w-full">
        <YouTube
          videoId={videoId}
          opts={opts}
          className="rounded-lg shadow-lg w-full"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;