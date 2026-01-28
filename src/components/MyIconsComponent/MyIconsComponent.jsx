// 1. Імпортуємо іконки за схемою: ~icons/{колекція}/{назва}
import IconMap from "~icons/bi/map";
import IconDisplay from "~icons/bi/display";
import IconWind from "~icons/bi/wind";
import IconDiagram3 from "~icons/bi/diagram-3";
import IconCupHot from "~icons/bi/cup-hot";
import IconShower from "~icons/ph/shower";
import IconGrid1x2 from "~icons/bi/grid-1x2";
import IconGrid from "~icons/bi/grid";
import IconGrid3x3 from "~icons/bi/grid-3x3-gap";
import IconUiRadios from "~icons/bi/ui-radios";
import IconFuelPump from "~icons/bi/fuel-pump";

import IconFridge from "~icons/solar/fridge-outline";
import IconMicrowave from "~icons/lucide/microwave";
import IconGasStove from "~icons/hugeicons/gas-stove";
import IconWater from "~icons/ion/water-outline";

import IconHeart from "~icons/bi/heart";
import IconStarFill from "~icons/bi/star-fill";
import IconStarHalf from "~icons/bi/star-half";

const MyIconsComponent = () => {
  const containerStyle = { display: "flex", gap: "20px", fontSize: "32px" };

  return (
    <>
      <div>
        <img src="/IconsFigma.png" alt="Figma Icons" />
      </div>

      <div style={containerStyle}>
        <IconMap />
      </div>

      <div>
        <div style={containerStyle}>
          <IconDisplay />
          <IconWind />
          <IconDiagram3 />
          <IconCupHot />
          <IconShower />
          <IconGrid1x2 />
          <IconGrid />
          <IconGrid3x3 />
          <IconUiRadios />
          <IconFuelPump />
        </div>

        <div style={containerStyle}>
          <IconFridge />
          <IconMicrowave />
          <IconGasStove />
          <IconWater />
        </div>

        <div style={containerStyle}>
          {/* Передаємо колір через props або style */}
          <IconHeart style={{ color: "var(--button)" }} />
          <IconHeart style={{ color: "var(--main)" }} />

          <br />

          <IconStarFill style={{ color: "var(--badges)" }} />
          <IconStarHalf style={{ color: "var(--rating)" }} />
          <IconStarFill style={{ color: "var(--rating)" }} />
        </div>
      </div>
    </>
  );
};

export default MyIconsComponent;
