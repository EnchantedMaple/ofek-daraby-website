import { useReducer, useEffect, useRef } from 'react'

import './App.css'

import InfoCard from './InfoCard'

import lifePic from "./assets/lifePic.png"
import traitsPic from "./assets/traitsPic.png"
import thinkPic from "./assets/thinkPic.jpg"
import socialPic from "./assets/socialPic.jpg"

// icons
import { HiCog6Tooth } from "react-icons/hi2";
import { HiAcademicCap } from "react-icons/hi2";
import { HiCubeTransparent } from "react-icons/hi2";
import { HiCodeBracket } from "react-icons/hi2";
import { HiMiniPuzzlePiece } from "react-icons/hi2";

import { VscDebugContinue } from "react-icons/vsc";
import { FaLeaf } from "react-icons/fa";
import { TbBracketsContain } from "react-icons/tb";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";

const HUE_MAX = 36
const HUE_STEPS = 10
const MIN_JUMPS_EASTER_EGG = 3
const ICONS_INTERVAL_EASTER_EGG = 80

// used for the cards with the personal info
var cards = [
  {
    title: "My Life",
    photo: lifePic,
    description: /* \u{2082} for numbers */ "Born in 2003, I've always been very curious and creative, trying to make new things and explore unknown subjects. My outlet for creativity went through a lot of phases and ended up taking me to violin classes for 10 years as well as programming and creating tools and even games.",
    icon: VscDebugContinue,
    color: "rgb(177, 39, 158)",
    opacity: "8%",
    titleFont: "KH",
    descriptionFont: "SCM",
  },
  {
    title: "My Traits",
    photo: traitsPic,
    description: "I'm very open-minded, always glad to learn new things from people or explain things of my own. I like to make jokes and have a sarcastic sense of humor. Disciplined, a lot of energy and motiviation, very joyful and respectful of other people that I meet.",
    icon: FaLeaf,
    color: "rgb(40, 201, 88)",
    opacity: "15%",
    titleFont: "DM",
    descriptionFont: "DM",
  },
  {
    title: "How I Think",
    photo: thinkPic,
    description: "I have a very calculated mind that can understand problems on a fundemental level which helped me excel in school and achive great positions in life. I like to take inspirations from all sorts of media to make my work including shows, art, music, games and more.",
    icon: TbBracketsContain,
    color: "rgb(106, 50, 211)",
    opacity: "10%",
    titleFont: "CVBl",
    descriptionFont: "CVBo",
  },
  {
    title: "Social Life",
    photo: socialPic,
    description: "Early on in life I had problems understanding and conversing with others but over the years I worked on these problems. Now I have many friedns from different branches of life who I enjoy spending time with and being around.",
    icon: HiOutlineChatBubbleOvalLeft,
    color: "rgb(192, 135, 50)",
    opacity: "15%",
    titleFont: "JM",
    descriptionFont: "JM",
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
  const jumpCount = useRef(0);

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
        // can't happen the first MIN_JUMPS_EASTER_EGG times
        if(Math.random() < 0.1 && jumpCount.current >= MIN_JUMPS_EASTER_EGG) {
          for(i = 0; i < icons.length; i++) {
            currentIcon = document.getElementById(icons[i].id);
            currentIcon.classList.add("jumping");
            currentIcon.style.animationDelay = i * ICONS_INTERVAL_EASTER_EGG + "ms";
          }
        }
        else {
          currentIcon.classList.add("jumping");
        }
        jumpCount.current++;
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
          <div className='icon-div' onClick={() => iconClick(entry.id, true)}>
            {/* probably the stupidest solution iv'e ever come up with, couldn't believe this would actually work */}
            {<entry.icon id={entry.id} onAnimationEnd={resetIcon} className='icon' />}
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
            icon={card.icon}
            color={card.color}
            opacity={card.opacity}
            right={index % 2 == 0}
            titleFont={card.titleFont}
            descriptionFont={card.descriptionFont}
          />)}
      </section>
    </>
  )
}

export default App
