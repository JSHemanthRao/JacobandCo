"use client";

import React, { useEffect, useRef, memo } from "react";

interface OptimizedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string;
}

function OptimizedVideoComponent({ src, className, ...props }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.debug("Video play interrupted:", error);
            });
          }
        } else {
          video.pause();
        }
      },
      {
        rootMargin: "200px 0px",
        threshold: 0,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Support for WebM fallback if passing an .mp4
  const isMp4 = typeof src === "string" && src.endsWith(".mp4");
  const webmSrc = isMp4 ? src.replace(".mp4", ".webm") : null;

  return (
    <video
      ref={videoRef}
      className={className}
      {...props}
    >
      {isMp4 && webmSrc && <source src={webmSrc} type="video/webm" />}
      <source src={src} type={isMp4 ? "video/mp4" : undefined} />
    </video>
  );
}

export default memo(OptimizedVideoComponent);
