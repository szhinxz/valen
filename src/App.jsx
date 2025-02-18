import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { src: "/public/image/image1.jpg", type: "image", caption: "when we live together" },
  { src: "/public/image/image2.jpg", type: "image", caption: "when you want to eat" },
  { src: "/public/image/image3.jpg", type: "image", caption: "when we start learn together" },
  { src: "/public/image/video1.mp4", type: "video", caption: "so happy when u smile" },  // Video
  { src: "/public/image/image4.jpg", type: "image", caption: "give some energy" },
  { src: "/public/image/image5.jpg", type: "image", caption: "give some light" },
  { src: "/public/image/image6.jpg", type: "image", caption: "long drive to get new thing" },
  { src: "/public/image/video2.mp4", type: "video", caption: "always make me happy" },  // Video
  { src: "/public/image/video3.mp4", type: "video", caption: "laugh with some joke" },  // Video
  { src: "/public/image/video4.mp4", type: "video", caption: "when u do something" },  // Video
  { src: "/public/image/image7.jpg", type: "image", caption: "travel together" },
  { src: "/public/image/image8.jpg", type: "image", caption: "and travel" },
  { src: "/public/image/image9.jpg", type: "image", caption: "congrats with me" },
  { src: "/public/image/video5.mp4", type: "video", caption: "never bored" },  // Video
  { src: "/public/image/video6.mp4", type: "video", caption: "some kiss" },  // Video
  { src: "/public/image/video7.mp4", type: "video", caption: "some eat" },  // Video
  { src: "/public/image/image10.jpg", type: "image", caption: "some movie" },
  { src: "/public/image/image12.jpg", type: "image", caption: "with cat" },
  { src: "/public/image/video8.mp4", type: "video", caption: "always shine for me" },  // Video
  { src: "/public/image/video9.mp4", type: "video", caption: "new years with u is the best" },  // Video
  { src: "/public/image/image13.jpg", type: "image", caption: "take a photo" },
  { src: "/public/image/image14.jpg", type: "image", caption: "when u need food" },
  { src: "/public/image/image15.jpg", type: "image", caption: "and travel more" },
  { src: "/public/image/image16.jpg", type: "image", caption: "and movie more" },
  { src: "/public/image/video10.mp4", type: "video", caption: "when we first time eat together" },  // Video
  { src: "/public/image/image17.jpg", type: "image", caption: "is the best time in my life" },
  
];

function App() {
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);
  const [fadeOut, setFadeOut] = useState(false); // สถานะสำหรับ fade out
  const ref = useRef(null);


  useEffect(() => {
    if (showPlayer) {
      setIframeKey((prev) => prev + 1); // บังคับให้ iframe โหลดใหม่

      // เริ่ม Auto Slide
      const interval = setInterval(() => {
        setCurrentItem((prev) => (prev + 1) % items.length);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [showPlayer]);

  const handleAudioEnded = () => {
    setFadeOut(true); // เริ่มให้ fade out
    setTimeout(() => {
      setShowPlayer(false); // ซ่อน player เมื่อ fade out เสร็จ
    }, 500); // รอให้การ fade-out เสร็จสิ้น
  };

  return (
    <div className="flex flex-col items-center p-8 space-y-4">
    {/* รูปภาพเริ่มต้นและข้อความ */}
    <AnimatePresence>
      {!showPlayer && !fadeOut && (
        <motion.div
          key="initial-content"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.img
            className="h-24 block-full shadow-lg mx-auto"
            src="/src/assets/anime.png"
            alt="Anime Avatar"
          />
          <p className="text-lg font-semibold text-white mt-4">มีอะไรอยากจะบอก</p>
          <button
            onClick={() => setShowPlayer(true)}
            className="mt-4 border border-purple-200 text-white-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 p-2 rounded"
          >
            คลิกปุ่มดูสิ
          </button>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Image Slider และข้อความ */}
    <AnimatePresence>
        {showPlayer && !fadeOut && (
          <div className="relative w-100 h-100 overflow-hidden text-center">
            {items[currentItem].type === "image" ? (
              <motion.img
                key={items[currentItem].src}
                src={items[currentItem].src}
                className="absolute w-full h-full object-cover block-full shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              />
            ) : (
              <motion.video
                key={items[currentItem].src}
                className="absolute w-full h-full object-cover block-full shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                src={items[currentItem].src}
                autoPlay
                muted
                loop
              />
            )}

            <motion.p
              className="absolute bottom-4 w-full text-3xl text-white font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                textShadow: '0px 0px 50px rgba(0, 0, 0, 0.8)' // กรอบเรืองแสง
              }}
            >
              {items[currentItem].caption} {/* แสดงข้อความที่ตรงกับ currentItem */}
            </motion.p>
          </div>
        )}
      </AnimatePresence>

    {/* Spotify Player */}
    <AnimatePresence>
      {showPlayer && !fadeOut && (
        <motion.div
          key={iframeKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg shadow-lg w-full"
        >
          <iframe
            style={{ borderRadius: "12px", width: "100%", height: "152px" }}
            src="https://open.spotify.com/embed/track/4Tp1SRCTJ6LO8XA3i9vuAT?utm_source=generator"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Audio Player */}
    {showPlayer && !fadeOut && (
      <audio ref={ref} src="/src/assets/music.mp4" autoPlay onEnded={handleAudioEnded} />
    )}

    {/* ข้อความหลังเพลงจบ */}
    {fadeOut && (
      <motion.div
        key="final-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white font-semibold"
      >
        Happy Valentine's day
      </motion.div>
    )}
  </div>
  );
}

export default App
