import { useState } from 'react'
import './InfoCard.css'

function InfoCard(props) {
  const [count, setCount] = useState(0)

  return (
    <div className={props.right ? "card-right" : "card-left"}>
      <img src={props.photo} />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  )
}

export default InfoCard