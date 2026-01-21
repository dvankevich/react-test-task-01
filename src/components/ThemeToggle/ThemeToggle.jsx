import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px ",
        cursor: "pointer",
        borderRadius: "12.5rem",
        border: "1px solid var(--gray-light)",
        backgroundColor: "var(--inputs)",
        color: "var(--main)",
        fontWeight: 600,
        fontFamily: "inherit",
        transition: "all 0.3s ease",
      }}
      aria-label={
        theme === "light" ? "Enable dark theme" : "Enable light theme"
      }
      title={theme === "light" ? "Dark theme" : "Light theme"}
    >
      {theme === "light" ? (
        <>
          <Icon icon="bi:moon-fill" width="20" height="20" />
        </>
      ) : (
        <>
          <Icon icon="bi:sun-fill" width="20" height="20" />
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
