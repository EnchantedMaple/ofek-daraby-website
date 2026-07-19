import { useEffect, useRef, useState } from "react";
import './InfoCard.css'
import bubble from "./assets/bubble.png"

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function InfoCard(props) {
  const [images, setImages] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = idRef.current++;
      const newImage = {
        id,
        duration: randomBetween(3, 7), // seconds to cross the div
        topPercent: randomBetween(10, 80), // starting vertical position
        wobble: randomBetween(15, 45), // px of up/down drift during travel
        direction: Math.random() > 0.5 ? 1 : -1, // wobble up first or down first
        size: randomBetween(40, 64), // px
      };
      setImages((prev) => [...prev, newImage]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className={props.right ? "card-right card" : "card-left card"}>
      <div>
        <div className="img-div">
          <img src={props.photo} />
        </div>
        <div className="text-div">
          <h1>{props.title}</h1>
          <h3>{props.description}</h3>
        </div>
      </div>

      <style>{`
        @keyframes crossDiv {
          0% {
            left: -80px;
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(calc(var(--wobble) * -1px)) rotate(-4deg);
          }
          50% {
            transform: translateY(calc(var(--wobble) * 1px)) rotate(3deg);
          }
          75% {
            transform: translateY(calc(var(--wobble) * -0.6px)) rotate(-2deg);
          }
          100% {
            left: 100%;
            transform: translateY(0) rotate(0deg);
          }
        }
      `}</style>
      {images.map((img) => (
        <img
          key={img.id}
          src={bubble}
          alt=""
          onAnimationEnd={() => removeImage(img.id)}
          style={{
            position: "relative",
            top: `${img.topPercent}%`,
            width: `${img.size}px`,
            height: `${img.size}px`,
            animationName: "crossDiv",
            animationDuration: `${img.duration}s`,
            animationTimingFunction: "initial",
            animationFillMode: "forwards",
            "--wobble": img.direction * img.wobble,
          }}
        />
      ))}
    </div>
  )
}

export default InfoCard