import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className={styles.themeBtn}
      aria-label={
        theme === "light" ? "Enable dark theme" : "Enable light theme"
      }
      title={theme === "light" ? "Dark theme" : "Light theme"}
    >
      <span className={styles.icon}>
        {theme === "light" ? (
          <Icon icon="bi:moon-fill" width="20" height="20" />
        ) : (
          <Icon icon="bi:sun-fill" width="20" height="20" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
