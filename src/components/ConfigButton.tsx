import React from "react";
import { configButtonTestId } from "./TestId";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ConfigForm from "./ConfigForm";

interface ConfigButtonProps {
  setPomodoroCountdownInSeconds: (pomodoroCountdownInSeconds: number) => void;
  setBreakCountdownInSeconds: (breakCountdownInSeconds: number) => void;
  pomodoroCountdownInSeconds: number;
  breakCountdownInSeconds: number;
}

export default function ConfigButton({
  setPomodoroCountdownInSeconds,
  setBreakCountdownInSeconds,
  pomodoroCountdownInSeconds,
  breakCountdownInSeconds,
}: ConfigButtonProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <IconButton
        data-testid={configButtonTestId}
        onClick={handleClickOpen}
        sx={{
          display: "block",
          position: "fixed",
          marginLeft: "2em",
        }}
      >
        <SettingsIcon style={{ fontSize: 40 }} />
      </IconButton>
      <ConfigForm
        setPomodoroCountdownInSeconds={setPomodoroCountdownInSeconds}
        setBreakCountdownInSeconds={setBreakCountdownInSeconds}
        open={open}
        setOpen={setOpen}
        pomodoroCountdownInSeconds={pomodoroCountdownInSeconds}
        breakCountdownInSeconds={breakCountdownInSeconds}
      />
    </>
  );
}
