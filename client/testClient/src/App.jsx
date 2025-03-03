import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./components/Login"
import { Home } from "./components/Home"
import { Layout } from "./Layout"



function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
