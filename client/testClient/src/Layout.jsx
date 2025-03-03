import { useState, createContext } from 'react'
import { Navbar } from "./components/Navbar"
import { Box, Container, Typography } from '@mui/material'
import { Outlet } from "react-router-dom";




export const UserContext = createContext();

export const Layout = () => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        name: "Not Logged In"
    })

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box sx={{ flexGrow: 1, mt: 10 }}> {/* Ensures content starts below Navbar */}
                <Outlet />
            </Box>
        </Box>

    )
}
