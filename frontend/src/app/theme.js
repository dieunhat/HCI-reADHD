import React from "react";
import { useState, useEffect } from "react";

const ThemeContext = React.createContext("light-theme"); // 'light' is the default value

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const storedTheme = window.localStorage.getItem("theme");
        return storedTheme ? storedTheme : "light-theme";
    });

    useEffect(() => {
        window.localStorage.setItem("theme", theme);
    }, [theme]);
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;
