import React, { useRef, useEffect } from "react";

export default function Test() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  const handleCanPlayThrough = () => {
    console.log("Video can play through without stopping!");
  };

  const handleLoadedData = () => {
    console.log("Video data has loaded enough to play!");
  };

  return (
    <video
      ref={videoRef}
      controls
      width="600"
      height="400"
      autoplay
      muted
      loop
      onCanPlayThrough={handleCanPlayThrough}
      onLoadedData={handleLoadedData}
    >
      <source src="/animation.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
