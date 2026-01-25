import { useOutletContext } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "./CamperFeatures.module.css";

const featureConfig = [
  { key: "transmission", icon: "bi:diagram-3", label: (c) => c.transmission },
  { key: "engine", icon: "bi:fuel-pump", label: (c) => c.engine },
  { key: "AC", icon: "bi:wind", label: () => "AC" },
  { key: "bathroom", icon: "ph:shower", label: () => "Bathroom" },
  { key: "kitchen", icon: "bi:cup-hot", label: () => "Kitchen" },
  { key: "TV", icon: "bi:tv", label: () => "TV" },
  { key: "radio", icon: "bi:ui-radios", label: () => "Radio" },
  {
    key: "refrigerator",
    icon: "lucide:refrigerator",
    label: () => "Refrigerator",
  },
  { key: "microwave", icon: "lucide:microwave", label: () => "Microwave" },
  { key: "gas", icon: "hugeicons:gas-stove", label: () => "Gas" },
  { key: "water", icon: "ion:water-outline", label: () => "Water" },
];

const CamperFeatures = () => {
  const { camper } = useOutletContext(); // Отримуємо дані від батька

  return (
    <div className={styles.featuresSection}>
      <div className={styles.badges}>
        {featureConfig.map((item) => {
          const isVisible =
            typeof camper[item.key] === "boolean"
              ? camper[item.key]
              : !!camper[item.key];
          if (!isVisible) return null;
          return (
            <div key={item.key} className={styles.badge}>
              <Icon icon={item.icon} />
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
          <span>Length</span>
          <span>{parseFloat(camper.length)} m</span>
        </li>
        <li>
          <span>Width</span>
          <span>{parseFloat(camper.width)} m</span>
        </li>
        <li>
          <span>Height</span>
          <span>{parseFloat(camper.height)} m</span>
        </li>
        <li>
          <span>Tank</span>
          <span>{parseFloat(camper.tank)} l</span>
        </li>
        <li>
          <span>Consumption</span> <span>{camper.consumption}</span>
        </li>
      </ul>
    </div>
  );
};
export default CamperFeatures;
