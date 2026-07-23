import { useReducer, useEffect, useState } from 'react'

import './App.css'

import InfoCard from './InfoCard'

import picture from "./assets/hero.png"
import bubble from "./assets/bubble.png"

import { HiCog6Tooth } from "react-icons/hi2";
import { HiAcademicCap } from "react-icons/hi2";
import { HiCubeTransparent } from "react-icons/hi2";
import { HiCodeBracket } from "react-icons/hi2";
import { HiMiniPuzzlePiece } from "react-icons/hi2";

const HALF_SECOND = 500;
const HUE_MAX = 36
const HUE_STEPS = 10

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

function App() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [classes, setClasses] = useState([false, false, false, false, false])
  const [icons, setIcons] = useState([
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
  ]);

  function randomColor(index, id) {
    if(!document.getElementById(item).classList.contains("jumping")) {
      document.getElementById(id).classList.add("jumping");

      icons[index].color = "hsl(" + Math.floor(Math.random() * HUE_MAX) * HUE_STEPS + ", 100%, 80%)";
  
      forceUpdate();
      setTimeout(() => document.getElementById(id).classList.remove("jumping"), HALF_SECOND);
    }
  }

  useEffect(() => {
    for(let i = 0; i < icons.length; i++) {
      icons[i].color = "hsl(" + Math.floor(Math.random() * HUE_MAX) * HUE_STEPS + ", 100%, 80%)";
    }
    forceUpdate();
  }, []);

  return (
    <>
      <div className='header' >
        <div className='header-title'>
          <h1>Ofek Daraby</h1>
        </div>
        <div className='icons'>
          {icons.map((entry, index) =>
          <div className='icon' style={{color: entry.color}} onClick={() => randomColor(index, entry.id)}>
            {<entry.icon id={entry.id} style={{position: "absolute"}} />}
            {<entry.icon style={{color: "rgba(0, 0, 0, 0)"}} />}
            <h2 className='rainbow_text_animated'  style={{color: entry.color}}>{entry.text}</h2>
          </div>
            )}
        </div>
      </div>
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
