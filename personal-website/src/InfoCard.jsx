import { useEffect, useRef, useState } from "react";
import './InfoCard.css'

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function InfoCard(props) {
  const [images, setImages] = useState([]);
  //const [focused, setFocused] = useState(true);
  const idRef = useRef(0);
  var focused = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if(focused) {
        const id = idRef.current++;
        const newImage = {
          id,
          duration: randomBetween(15, 20), // seconds to cross the div
          topPercent: randomBetween(10, 80), // starting vertical position
          wobble: randomBetween(15, 45), // px of up/down drift during travel
          direction: Math.random() > 0.5 ? 1 : -1, // wobble up first or down first
          size: randomBetween(40, 64), // px
        };
        setImages((prev) => [...prev, newImage]);
      }
    }, 350);

    return () => clearInterval(interval);
  }, []);
    
  useEffect(() => {
      window.addEventListener("focus", () => {focused = true;});
      window.addEventListener("blur",  () => {focused = false;});
      return () => {
          window.removeEventListener("focus", () => {focused = true;});
          window.removeEventListener("blur", () => {focused = false;});
      };
  }, []);

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className={props.right ? "card-right card" : "card-left card"}>

      <div className="img-div">
        <div className="img-blur">
          <img src={props.photo} />
        </div>
      </div>
      <div className="text-div">
        <h1>{props.title}</h1>
        <h3>{props.description}</h3>
      </div>
      
      {images.map((img) => (
        <img
          key={img.id}
          src={props.backgroundImage}
          alt=""
          onAnimationEnd={() => removeImage(img.id)}
          style={{
            zIndex: -1,
            opacity: "25%",
            position: "absolute",
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