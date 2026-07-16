import { useState } from 'react'
import './App.css'

import InfoCard from './InfoCard'

import picture from "./assets/hero.png"

var cards = [
  {
    title: "Yepee",
    photo: picture,
    description: "were rolling"
  },
  {
    title: "you pee",
    photo: picture,
    description: "were rolling"
  }
]

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        {cards.map((card, index) => <InfoCard title={card.title} photo={card.photo} description={card.description} right={index % 2 == 0} />)}
      </section>
    </>
  )
}

export default App
