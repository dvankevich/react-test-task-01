import { Icons } from "../components/Icons";

export const featureConfig = [
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
