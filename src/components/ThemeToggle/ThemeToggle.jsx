import { useState, useEffect } from "react";

const ThemeToggle = () => {
  // 1. Ініціалізуємо стан: беремо значення з пам'яті або ставимо 'light'
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // 2. Щоразу, коли змінюється стан theme, оновлюємо атрибут на сторінці
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 3. Функція для зміни теми
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "10px 20px",
        cursor: "pointer",
        borderRadius: "8px",
        border: "1px solid var(--gray-light)",
        backgroundColor: "var(--inputs)",
        color: "var(--main)",
        fontWeight: 600,
        transition: "all 0.3s ease",
      }}
    >
      {theme === "light" ? "🌙 Темна тема" : "☀️ Світла тема"}
    </button>
  );
};

export default ThemeToggle;
