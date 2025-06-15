import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface ToggleVersions {
  readonly versions: string[];
  readonly handleChangeVersion: (version: string) => void;
}

export default function ToggleVersions({
  versions,
  handleChangeVersion,
}: ToggleVersions) {
  const [alignment, setAlignment] = React.useState<string | null>(null);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    handleChangeVersion(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="version"
    >
      {versions.map((version, index) => {
        return (
          <ToggleButton value={version} aria-label={version} key={index}>
            <span className={alignment === version ? "text-sky-600" : ""}>
              {version}
            </span>
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}
