import React, { createContext, useState, useMemo } from 'react';

import {
  ThemeProvider, 
  createTheme, 
  useMediaQuery 
} from '@mui/material';

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );

  return (
    <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkModeProvider };
