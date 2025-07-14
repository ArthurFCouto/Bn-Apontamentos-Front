import { Alert, AlertProps, Snackbar } from "@mui/material";

export interface MainAlertProps {
  message: string;
  open: boolean;
  onClose?: () => void;
  severity?: AlertProps["severity"];
}

const MainAlert = ({
  message,
  open = false,
  onClose = () => {},
  severity = "info",
}: MainAlertProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={5000}
      open={open}
      onClose={onClose}
      message={message}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MainAlert;
