import { useEffect, useState } from "react";

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let targetLink = "https://t.me/+gsPXxiemhcI2ODk1"; // fallback

    const fetchLink = async () => {
      try {
        const res = await fetch("/api/link");
        if (res.ok) {
          const data = await res.json();
          if (data.link) {
            targetLink = data.link;
          }
        }
      } catch (err) {
        console.error("Failed to fetch link", err);
      }
    };

    fetchLink();

    // Progress bar animation
    const duration = 2500; // 2.5 seconds to feel like 2-3 seconds
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        window.location.href = targetLink;
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Empty circle where image used to be */}
        <div className="w-24 h-24 rounded-full border-4 border-black flex items-center justify-center p-1 mb-6">
           <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
               {/* Image removed as requested, leaving a blank circle */}
           </div>
        </div>
        <p className="text-xl font-semibold text-black">
          {progress}% Loading...
        </p>
      </div>
    </div>
  );
}
