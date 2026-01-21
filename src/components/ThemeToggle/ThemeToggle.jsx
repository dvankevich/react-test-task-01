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
        // Додаємо Flexbox для вирівнювання іконки та тексту
        display: "flex",
        alignItems: "center",
        gap: "8px", // Відступ між іконкою та текстом

        padding: "10px 16px", // Трохи зменшив бічні відступи
        cursor: "pointer",
        borderRadius: "8px",
        border: "1px solid var(--gray-light)",
        backgroundColor: "var(--inputs)",
        color: "var(--main)",
        fontWeight: 600,
        fontFamily: "inherit", // Щоб наслідувати Inter
        transition: "all 0.3s ease",
      }}
      // Додаємо aria-label для доступності (щоб скрінрідери розуміли кнопку)
      aria-label="Toggle light and dark"
    >
      {theme === "light" ? (
        /* Якщо зараз світла тема, показуємо Місяць (щоб увімкнути темну) */
        <>
          <Icon icon="bi:moon-fill" width="20" height="20" />
          <span>Темна тема</span>
        </>
      ) : (
        /* Якщо зараз темна тема, показуємо Сонце (щоб увімкнути світлу) */
        <>
          <Icon icon="bi:sun-fill" width="20" height="20" />
          <span>Світла тема</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
