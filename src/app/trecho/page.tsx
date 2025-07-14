import AuthGuard from "@/components/app/auth/authGuard";
import MainNav from "@/components/shared/mainNav";
import { paths } from "@/paths";
import { Home } from "@mui/icons-material";
import { Box, Button, Stack, SxProps, Typography } from "@mui/material";
import RouterLink from "next/link";

const styleMain: SxProps = {
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  marginLeft: 8,
  minHeight: "100%",
};

const styleStack: SxProps = { alignItems: "center", maxWidth: "md" };

export default function Trecho() {
  return (
    <>
      <MainNav />
      <AuthGuard />
      <Box component="main" sx={styleMain}>
        <Stack spacing={3} sx={styleStack}>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Funcionalidade em implantação
          </Typography>
          <Typography
            color="text.secondary"
            variant="body1"
            sx={{ textAlign: "center" }}
          >
            Ainda estamos trabalhando na implantação desta funcionalidade.
          </Typography>
          <Button
            component={RouterLink}
            href={paths.auth.signIn}
            startIcon={<Home />}
            variant="contained"
          >
            Home
          </Button>
        </Stack>
      </Box>
    </>
  );
}
