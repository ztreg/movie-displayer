"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface VideoIframeProps {
  videoId: string;
  autoPlay?: boolean;
  title: string;
}

const VideoIframe = ({ videoId, autoPlay = false, title }: VideoIframeProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [videoHeight, setVideoHeight] = useState(300);

  const updateVideoHeight = useCallback(() => {
    if (iframeRef.current) {
      const width = Math.min(iframeRef.current.offsetWidth, 500);
      setVideoHeight(Math.min(width * 0.5625, 300));
    }
  }, []);

  useEffect(() => {
    updateVideoHeight();
    window.addEventListener("resize", updateVideoHeight);
    return () => window.removeEventListener("resize", updateVideoHeight);
  }, [updateVideoHeight]);

  return (
    <div className="w-full max-w-[500px] flex justify-center">
      <iframe
        ref={iframeRef}
        title={title}
        width="100%"
        height={`${videoHeight}px`}
        src={`https://www.youtube.com/embed/${videoId}${autoPlay ? "?autoplay=1" : ""}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-2xl shadow-lg w-full"
      />
    </div>
  );
};

export default VideoIframe;
