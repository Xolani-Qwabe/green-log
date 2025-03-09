import { Outlet } from 'react-router';
import {  Box } from '@mui/material';
import MyNav from './pages/components/MayNav';

interface LayoutComponentProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

function LayoutComponent({ onThemeToggle, isDarkMode }: LayoutComponentProps) {
  return (
    <Box sx={{ display: 'flex',minHeight: '100vh', minWidth: '98vw' , m:0}}>
      <MyNav onThemeToggle={onThemeToggle} isDarkMode={isDarkMode} />
      <Box sx={{ flexGrow: 1, pt: "8vh",maxWidth:"80%", m:"0 auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default LayoutComponent;
