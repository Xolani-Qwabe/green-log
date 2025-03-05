import { useState } from 'react'
import './App.css'
import Form from './Form'

function App() {
  const handleClick = () => {
    console.log("Button clicked!")
  }

  
  return (
    <div>
      {/* <button onClick={handleClick}>do something</button> */}
      <Form />
    </div>
  )
}

export default App
