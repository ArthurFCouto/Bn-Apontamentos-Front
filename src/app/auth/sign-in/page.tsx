import GuestGuard from "@/components/app/auth/guestGuard";
import SignInForm from "@/components/app/auth/sign-in/signInForm";
import { Box, SxProps } from "@mui/material";

const styleContainer: SxProps = { maxWidth: "400px", width: "100%" };

export default async function Login() {
  return (
    <Box sx={styleContainer}>
      <GuestGuard />
      <SignInForm />
    </Box>
  );
}
