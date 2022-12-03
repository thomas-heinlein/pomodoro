import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@mui/material";
import {
  configAreaTestId,
  configDialogBreakInputTestId,
  configDialogCancelButtonId,
  configDialogPomodoroInputTestId,
  configDialogSaveButtonId,
} from "./TestId";
import Button from "@mui/material/Button";
import React from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import "../App.css";

interface ConfigFormProps {
  setPomodoroCountdownInSeconds: (pomodoroCountdownInSeconds: number) => void;
  setBreakCountdownInSeconds: (breakCountdownInSeconds: number) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  pomodoroCountdownInSeconds: number;
  breakCountdownInSeconds: number;
}

export default function ConfigForm({
  setPomodoroCountdownInSeconds,
  setBreakCountdownInSeconds,
  open,
  setOpen,
  pomodoroCountdownInSeconds,
  breakCountdownInSeconds,
}: ConfigFormProps) {
  const handleClose = () => {
    setOpen(false);
  };

  interface InitialFormValues {
    pomodoroInMinutes: number;
    breakInMinutes: number;
  }

  const initialValues: InitialFormValues = {
    pomodoroInMinutes: pomodoroCountdownInSeconds / 60,
    breakInMinutes: breakCountdownInSeconds / 60,
  };

  return (
    <>
      <Dialog data-testid={configAreaTestId} open={open} onClose={handleClose}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setPomodoroCountdownInSeconds(
              values.pomodoroInMinutes * 60 || 25 * 60
            );
            setBreakCountdownInSeconds(values.breakInMinutes * 60 || 5 * 60);
            setSubmitting(false);
            setOpen(false);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <>
              <DialogTitle>Configuration</DialogTitle>
              <DialogContent>
                <Form>
                  <Field
                    className="configfield"
                    component={TextField}
                    name="pomodoroInMinutes"
                    type="number"
                    label="Countdown pomodoro in minutes"
                    data-testid={configDialogPomodoroInputTestId}
                  />
                  <br />
                  <Field
                    className="configfield"
                    component={TextField}
                    type="number"
                    label="Countdown break in minutes"
                    name="breakInMinutes"
                    data-testid={configDialogBreakInputTestId}
                  />
                  {isSubmitting && <LinearProgress />}
                  <br />
                </Form>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  data-testid={configDialogCancelButtonId}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                  data-testid={configDialogSaveButtonId}
                >
                  Save
                </Button>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
