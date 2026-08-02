import { useEffect, useRef, useState } from "react";
import './InfoCard.css'

const ICONS_DELAY = 800

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function InfoCard(props) {
  const [particles, setParticles] = useState([]);
  const idRef = useRef(0);
  var focused = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if(focused) {
        const id = idRef.current++;
        const newParticle = {
          id,
          duration: randomBetween(15, 20), // seconds to cross the div
          topPercent: randomBetween(10, 80), // starting vertical position
          wobble: randomBetween(15, 45), // px of up/down drift during travel
          direction: Math.random() > 0.5 ? 1 : -1, // wobble up first or down first
          size: randomBetween(1.5, 3), // px
        };
        setParticles((prev) => [...prev, newParticle]);
      }
    }, ICONS_DELAY);

    return () => clearInterval(interval);
  }, []);
    
  // starting/pausing particle spawn on page focus/unfocus.
  // if disabled, particles gather up at the start when
  // page is not focused and go all together on page re-focus
  useEffect(() => {
      window.addEventListener("focus", () => {focused = true;});
      window.addEventListener("blur",  () => {focused = false;});
      return () => {
          window.removeEventListener("focus", () => {focused = true;});
          window.removeEventListener("blur", () => {focused = false;});
      };
  }, []);

  // removes a single object from list of object based on id
  const removeParticle = (id) => {
    setParticles((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className={props.right ? "card-right card" : "card-left card"}>

      <div className="img-div">
        { /* blurred background to main image */ }
        <div className="img-blur">
          <img src={props.photo} />
        </div>
      </div>
      <div className="text-div">
        <h1 style={{fontFamily: props.titleFont}}>{props.title}</h1>
        <h2 style={{fontFamily: props.descriptionFont}}>{props.description}</h2>
      </div>

      { /* rendering all the particles */ }
      {particles.map((particle) => (
        <props.icon
          key={particle.id}
          onAnimationEnd={() => removeParticle(particle.id)}
          /* dynamic animation */
          style={{
            color: props.color,
            zIndex: -1,
            opacity: props.opacity,
            position: "absolute",
            top: `${particle.topPercent}%`,
            width: `calc(${particle.size}vw + 10px)`,
            height: `calc(${particle.size}vw + 10px)`,
            animationName: "crossDiv",
            animationDuration: `${particle.duration}s`,
            "--wobble": particle.direction * particle.wobble,
          }}
        />
      ))}
    </div>
  )
}

export default InfoCard