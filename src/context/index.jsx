import { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem(`theme`)) || "light"
  );

  const [language, setLanguage] = useState(
    JSON.parse(localStorage.getItem(`language`)) || "eng"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem(`theme`, JSON.stringify(newTheme));
  };

  const toggleLanguage = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    localStorage.setItem("language", JSON.stringify(newLanguage));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, toggleLanguage, language }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
