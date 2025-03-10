import { createTheme } from '@mui/material/styles';

// Custom Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#001c29', // Dark background
      paper: '#194054', // Darker paper background
    },
    text: {
      primary: '#ccecfd', // Light grayish text for primary
      secondary: '#9ea8ae', // Lighter grayish text
      disabled: '#d3d9dc', // Very light gray for disabled text
    },
    primary: {
      main: '#80C4E9', // Light blue for primary color
    },
    secondary: {
      main: '#C5BAFF', // Light purple for secondary color
    },
    warning: {
      main: '#FF8383', // Light red for warning
    },
    success: {
      main: '#4CAF50', // Green for success
    },
  },
  typography: {
    allVariants: {
      color: '#d3d9dc', // Ensures all text variants are light on dark mode
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff', // Light background
      paper: '#f5f5f5', // Lighter paper background
    },
    text: {
      primary: '#000000', // Black text for light theme
      secondary: '#555555', // Darker secondary text for contrast
    },
    primary: {
      main: '#80C4E9', // Light blue for primary color
    },
    secondary: {
      main: '#C5BAFF', // Light purple for secondary color
    },
    warning: {
      main: '#FF8383', // Light red for warning
    },
    success: {
      main: '#4CAF50', // Green for success
    },
  },
  typography: {
    allVariants: {
      color: '#000000', // Ensures all text variants are dark in light mode
    },
  },
});
