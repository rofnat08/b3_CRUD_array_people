import { useState } from 'react'
import './App.css'
import { People } from './components/People';

function App() {
   // el useStage es para guardar una variable estado (a travès del estado setea el dato)
  const [people, setPeople] = useState([
    {
      id: 1,
      name: "Nataly Rodriguez",
      role: "Backend Developer",
      img: "https://bootdey.com/img/Content/avatar/avatar8.png"
    },
    {
      id: 2,
      name: "Inès Oliveros",
      role: "Backend Developer",
      img: "https://bootdey.com/img/Content/avatar/avatar3.png"
    },
    {
      id: 3,
      name: "David Romero",
      role: "QA",
      img: "https://bootdey.com/img/Content/avatar/avatar2.png"
    }
  ]);
  return (
    <div>
      <People
        people={people}
        setPeople={setPeople}
      />
    </div>
  )
}

export default App