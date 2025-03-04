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
      showinfo: 0, // Hides video info (title, uploader, etc.)
      fs: 0, // Hides fullscreen button
      iv_load_policy: 3, // Disables annotations
      cc_load_policy: 0, // Disables closed captions
      enablejsapi: 1, // Allows JavaScript API (needed for some controls)
    },

  };

  return (
    <div className="flex justify-center">
      {/* Set max width and height responsively */}
      <div className="w-full max-w-[560px] sm:max-w-[320px] md:max-w-[560px] sm:h-[200px] md:h-[315px] lg:h-[351px]">
        <YouTube
          videoId={videoId}
          opts={opts}
          className="w-full h-full rounded-2xl shadow-lg"
          style={{
            borderRadius: '1.5rem', // Apply a custom border-radius
            overflow: 'hidden', // Ensures the rounded corners
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;