import { useState } from "react";
import Switch from "./Switch";

function ToggleSwitch() {
  const [active, setActive] = useState<"instock" | "frontstore">("instock");
  return (
    <div className="flex items-center w-[200px] gap-2 p-2 rounded-full bg-zinc-100">
      <Switch
        title="ในสต็อก"
        active={active === "instock"}
        onClick={() => setActive("instock")}
      />
      <Switch
        title="หน้าร้าน"
        active={active === "frontstore"}
        onClick={() => setActive("frontstore")}
      />
    </div>
  );
}

export default ToggleSwitch;
