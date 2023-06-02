import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export default function AppAlert() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Stack sx={{ width: "400px" }} spacing={2}>
        <Alert severity="info">
          <AlertTitle>
            Sorry, cannot find content you search. Please check your search input, and try again!
          </AlertTitle>
        </Alert>
      </Stack>
    </div>
  );
}