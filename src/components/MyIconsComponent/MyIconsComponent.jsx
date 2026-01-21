import { Icon } from "@iconify/react";

const MyIconsComponent = () => {
  return (
    <>
      <div>
        <img src="/IconsFigma.png" />
      </div>
      <div style={{ display: "flex", gap: "20px", fontSize: "32px" }}>
        {/* Map */}
        <Icon icon="bi:map" />
      </div>
      <div>
        <div style={{ display: "flex", gap: "20px", fontSize: "32px" }}>
          {/* Приклад звичайних іконок */}
          <Icon icon="bi:display" />
          <Icon icon="bi:wind" />
          <Icon icon="bi:diagram-3" />
          <Icon icon="bi:cup-hot" />
          <Icon icon="ph:shower" />
          <Icon icon="bi:grid-1x2" />
          <Icon icon="bi:grid" />
          <Icon icon="bi:grid-3x3-gap" />
          <Icon icon="bi:ui-radios" />
          <Icon icon="bi:fuel-pump" />
        </div>
        <div style={{ display: "flex", gap: "20px", fontSize: "32px" }}>
          {/* Приклад побутової техніки */}
          <Icon icon="solar:fridge-outline" />
          <Icon icon="lucide:microwave" />
          <Icon icon="hugeicons:gas-stove" />
          <Icon icon="ion:water-outline" />
        </div>
        <div style={{ display: "flex", gap: "20px", fontSize: "32px" }}>
          {/* --- Інтерактивні іконки (Серце) --- */}
          {/* Пусте */}
          <Icon icon="bi:heart" color="var(--button)" />
          <Icon icon="bi:heart" color="var(--main)" />

          {/* Заповнене (червоне) - у Lucide ми фарбуємо stroke і fill */}
          {/* <Icon icon="bi:heart-fill" color="red" style={{ fill: "red" }} /> */}
          <br />
          {/* --- Інтерактивні іконки (Зірка) --- */}
          {/* Заповнена (жовта) */}
          <Icon icon="bi:star-fill" color="var(--badges)" />
          <Icon icon="bi:star-half" color="var(--rating)" />
          <Icon icon="bi:star-fill" color="var(--rating)" />
        </div>
      </div>
    </>
  );
};

export default MyIconsComponent;
