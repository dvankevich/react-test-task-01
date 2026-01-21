import { Icon } from "@iconify/react";

const MyIconsComponent = () => {
  return (
    <>
      <div>
        <img src="/IconsFigma.png" />
      </div>
      <div>
        <div style={{ display: "flex", gap: "20px", fontSize: "32px" }}>
          {/* Приклад звичайних іконок */}
          <Icon icon="bi:display" />
          <Icon icon="bi:wind" />

          <Icon icon="bi:workflow" />
          <Icon icon="bi:git-merge" />
          <Icon icon="bi:hierarchy" />
          <Icon icon="bi:coffee" />
        </div>
        <div style={{ display: "flex", gap: "20px", fontSize: "32px" }}>
          {/* Приклад побутової техніки */}
          <Icon icon="lucide:refrigerator" />
          <Icon icon="lucide:microwave" />
        </div>
        <div style={{ display: "flex", gap: "20px", fontSize: "32px" }}>
          {/* --- Інтерактивні іконки (Серце) --- */}
          {/* Пусте */}
          <Icon icon="lucide:heart" />

          {/* Заповнене (червоне) - у Lucide ми фарбуємо stroke і fill */}
          <Icon icon="lucide:heart" color="red" style={{ fill: "red" }} />
          <br />
          {/* --- Інтерактивні іконки (Зірка) --- */}
          {/* Заповнена (жовта) */}
          <Icon
            icon="lucide:star"
            color="#fbbf24"
            style={{ fill: "#fbbf24" }}
          />
        </div>
      </div>
    </>
  );
};

export default MyIconsComponent;
