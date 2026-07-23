import { useReducer, useEffect, useState } from 'react'

import './App.css'

import InfoCard from './InfoCard'

import picture from "./assets/hero.png"
import bubble from "./assets/bubble.png"

// icons
import { HiCog6Tooth } from "react-icons/hi2";
import { HiAcademicCap } from "react-icons/hi2";
import { HiCubeTransparent } from "react-icons/hi2";
import { HiCodeBracket } from "react-icons/hi2";
import { HiMiniPuzzlePiece } from "react-icons/hi2";

const HUE_MAX = 36
const HUE_STEPS = 10

// used for the cards with the personal info
var cards = [
  {
    title: "Yepee",
    photo: picture,
    description: "were rolling",
    backgroundImage: bubble,
  },
  {
    title: "you pee",
    photo: picture,
    description: "were rolling",
    backgroundImage: bubble,
  }
]

// used for the icons in the header
// would use useState but it won't trigger a re-render either way so i rather it be up here
var icons = [
  {
    icon: HiCog6Tooth,
    text: <>Programer</>,
    color: "hsl(0, 0%, 0%)",
    id: "cog",
  },
  {
    icon: HiAcademicCap,
    text: <>Magshimim<br />Graduate</>,
    color: "hsl(0, 0%, 0%)",
    id: "cap",
  },
  {
    icon: HiCubeTransparent,
    text: <>Game<br />Developer</>,
    color: "hsl(0, 0%, 0%)",
    id: "cube",
  },
  {
    icon: HiCodeBracket,
    text: <>Fullstack<br />Developer</>,
    color: "hsl(0, 0%, 0%)",
    id: "bracket",
  },
  {
    icon: HiMiniPuzzlePiece,
    text: <>Flexible</>,
    color: "hsl(0, 0%, 0%)",
    id: "puzzle",
  }
]

function App() {
  const [, forceUpdate] = useReducer(x => x + 1, 0); // component won't re-render without this

  // jump on click event
  function iconClick(id, jump) {
    let newColor = "hsl(" + Math.floor(Math.random() * HUE_MAX) * HUE_STEPS + ", 100%, 80%)";
    let currentIcon = document.getElementById(id);
    let currentHeader = document.getElementById(id + "h2");
    let i = 0;

    // only jump if not currently jumping
    if(!currentIcon.classList.contains("jumping")) {

      currentIcon.style.color = newColor;
      currentHeader.style.color = newColor;
      
      // the best way i found to force re-render
      forceUpdate();
      
      if(jump) {
        // small chance to trigger all icons
        if(Math.random() < 0.1) {
          for(i = 0; i < icons.length; i++) {
            currentIcon = document.getElementById(icons[i].id);
            currentIcon.classList.add("jumping");
            currentIcon.style.animationDelay = i * 80 + "ms";
          }
        }
        else {
          currentIcon.classList.add("jumping");
        }
      }
    }
  }

  // reseting an icon's animation class and animation delay
  function resetIcon(event) {
    event.target.classList.remove("jumping")
    event.target.style.animationDelay = "0ms";
  }

  // giving each icon a random color on page load
  useEffect(() => {
    for(let i = 0; i < icons.length; i++) {
      iconClick(icons[i].id, false);
    }
    forceUpdate();
  }, []);

  return (
    <>
    
      {/* header */}
      <div className='header' >
        <h1>Ofek Daraby</h1>
        <div className='icons'>
          {icons.map((entry) =>
          <div className='icon' onClick={() => iconClick(entry.id, true)}>
            {/* probably the stupidest solution iv'e ever come up with, couldn't believe this would actually work */}
            {<entry.icon id={entry.id} onAnimationEnd={resetIcon} style={{position: "relative"}} />}
            <h2 id={entry.id + "h2"} className='rainbow_text_animated'>{entry.text}</h2>
          </div>
            )}
        </div>
      </div>

      {/* info cards */}
      <section id="center">
        {cards.map((card, index) =>
          <InfoCard
            title={card.title}
            photo={card.photo}
            description={card.description}
            backgroundImage={card.backgroundImage}
            right={index % 2 == 0}
          />)}
      </section>
    </>
  )
}

export default App
