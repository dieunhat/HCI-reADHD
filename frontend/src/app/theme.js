import React from 'react';
import { useState } from 'react'; 

const ThemeContext = React.createContext('light-theme'); // 'light' is the default value

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light-theme');
  
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

export default ThemeContext;