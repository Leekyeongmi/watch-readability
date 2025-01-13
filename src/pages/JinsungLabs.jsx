import React, { useEffect, useRef, useState } from "react";

const InteractiveClock = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [time, setTime] = useState(new Date());
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Access webcam
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (err) {
        console.error("Webcam access denied or not available:", err);
      }
    };

    startWebcam();

    return () => {
      clearInterval(timer);
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // Draw webcam feed to canvas
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const video = videoRef.current;

    const drawToCanvas = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Draw time
        context.font = "30px Arial";
        context.fillStyle = hovered ? "red" : "white";
        const currentTime = time.toLocaleTimeString();
        const textWidth = context.measureText(currentTime).width;
        context.fillText(currentTime, (canvas.width - textWidth) / 2, canvas.height - 30);
      }
      requestAnimationFrame(drawToCanvas);
    };

    drawToCanvas();
  }, [time, hovered]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#333",
        color: "white",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{ border: "5px solid white", borderRadius: "8px" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <video ref={videoRef} style={{ display: "none" }} />
    </div>
  );
};

export default InteractiveClock;
