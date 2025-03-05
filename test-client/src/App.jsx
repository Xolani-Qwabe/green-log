import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/status", { withCredentials: true })
        if (response.data.loggedIn) {
          navigate("/home") 
        } else {
          navigate("/login") 
        }
      } catch (error) {
        console.error("Error checking auth status:", error)
        navigate("/login")
      }
    }

    checkAuth()
  }, [navigate])

  return null 
}

export default App
