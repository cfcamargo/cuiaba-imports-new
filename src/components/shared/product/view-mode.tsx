import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { LayoutGrid, LayoutList } from "lucide-react";
import React from "react";

interface ViewModeProps {
  readonly handleChangeView: (view: "grid" | "list") => void;
}

export default function ViewMode({ handleChangeView }: ViewModeProps) {
  const [alignment, setAlignment] = React.useState<"grid" | "list">("grid");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "grid" | "list"
  ) => {
    setAlignment(newAlignment);
    handleChangeView(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="view-mode"
      size="small"
    >
      <ToggleButton value="grid" aria-label="grid">
        <Tooltip title="Visualizar em grid">
          <LayoutGrid className={alignment === "grid" ? "text-sky-600" : ""} />
        </Tooltip>
      </ToggleButton>

      <ToggleButton value="list" aria-label="list">
        <Tooltip title="Visualizar em lista">
          <LayoutList className={alignment === "list" ? "text-sky-600" : ""} />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
