import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { darkTheme, lightTheme } from './theme.tsx';

import Home from './pages/Home';
import About from './pages/About';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';
import Account from './pages/Account';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import LayoutComponent from './LayoutComponent';

// Auth Context
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
            color: isDarkMode ? '#ffffff' : '#000000',
            transition: 'background-color 0.3s ease-in-out',
          },
        }}
      />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <LayoutComponent onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode} />
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/signup" element={<LoginSignup />} />
              <Route path="/dashboard" element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="account" element={<Account />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
