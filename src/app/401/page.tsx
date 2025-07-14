import { paths } from "@/paths";
import { Login } from "@mui/icons-material";
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

export default function Unauthorized() {
  return (
    <>
      <Box component="main" sx={styleMain}>
        <Stack spacing={3} sx={styleStack}>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            401: Usuário não autenticado
          </Typography>
          <Typography
            color="text.secondary"
            variant="body1"
            sx={{ textAlign: "center" }}
          >
            Ou o seu login expirou ou você não está logado, faça login
            novamente.
          </Typography>
          <Button
            component={RouterLink}
            href={paths.auth.signIn}
            startIcon={<Login />}
            variant="contained"
          >
            Sign In
          </Button>
        </Stack>
      </Box>
    </>
  );
}
