import { useState } from 'react'
import './App.css'

import CatBreeds from './componant/CatBreed/CatBreeds'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <CatBreeds />
    </>
  )
}

export default App
