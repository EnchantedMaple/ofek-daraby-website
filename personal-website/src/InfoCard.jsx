import { useState } from 'react'
import './InfoCard.css'

function InfoCard(props) {
  const [count, setCount] = useState(0)

  return (
    <div className={props.right ? "card-right card" : "card-left card"}>
      <div className="img-div">
        <img src={props.photo} />
      </div>
      <div className="text-div">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
    </div>
  )
}

export default InfoCard