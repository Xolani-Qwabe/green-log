import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';


let theme = createTheme({
  palette: {
    primary: {
      main: '#acfdbe',
    },
    secondary: {
      main: '#a0e7e5',
    },
  },
});



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>

        <App />

    </ThemeProvider>
  </StrictMode>,
)
