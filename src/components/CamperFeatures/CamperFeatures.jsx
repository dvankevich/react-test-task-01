import { useOutletContext } from "react-router-dom";
import { Icons } from "../Icons";
import styles from "./CamperFeatures.module.css";

const featureConfig = [
  {
    key: "transmission",
    icon: Icons.Transmission,
    label: (c) => c.transmission,
  },
  { key: "engine", icon: Icons.Engine, label: (c) => c.engine },
  { key: "AC", icon: Icons.AC, label: () => "AC" },
  { key: "bathroom", icon: Icons.Bathroom, label: () => "Bathroom" },
  { key: "kitchen", icon: Icons.Kitchen, label: () => "Kitchen" },
  { key: "TV", icon: Icons.TV, label: () => "TV" },
  { key: "radio", icon: Icons.Radio, label: () => "Radio" },
  { key: "refrigerator", icon: Icons.Fridge, label: () => "Refrigerator" },
  { key: "microwave", icon: Icons.Microwave, label: () => "Microwave" },
  { key: "gas", icon: Icons.Gas, label: () => "Gas" },
  { key: "water", icon: Icons.Water, label: () => "Water" },
];

const CamperFeatures = () => {
  const { camper } = useOutletContext();

  return (
    <div className={styles.featuresSection}>
      <div className={styles.badges}>
        {featureConfig.map((item) => {
          const isVisible =
            typeof camper[item.key] === "boolean"
              ? camper[item.key]
              : !!camper[item.key];

          if (!isVisible) return null;

          // Отримуємо компонент іконки з конфігу
          const IconComponent = item.icon;

          return (
            <div key={item.key} className={styles.badge}>
              {/* Рендеримо як звичайний компонент */}
              <IconComponent width="20" height="20" />
              <span className={styles.capitalize}>{item.label(camper)}</span>
            </div>
          );
        })}
      </div>

      <h3 className={styles.subTitle}>Vehicle details</h3>
      <ul className={styles.detailsList}>
        <li>
          <span>Form</span>{" "}
          <span className={styles.capitalize}>
            {camper.form.replace(/([A-Z])/g, " $1")}
          </span>
        </li>
        <li>
          <span>Length</span> <span>{parseFloat(camper.length)} m</span>
        </li>
        <li>
          <span>Width</span> <span>{parseFloat(camper.width)} m</span>
        </li>
        <li>
          <span>Height</span> <span>{parseFloat(camper.height)} m</span>
        </li>
        <li>
          <span>Tank</span> <span>{parseFloat(camper.tank)} l</span>
        </li>
        <li>
          <span>Consumption</span> <span>{camper.consumption}</span>
        </li>
      </ul>
    </div>
  );
};

export default CamperFeatures;
