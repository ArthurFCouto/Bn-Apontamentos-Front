"use client";

import AuthGuard from "@/components/app/auth/authGuard";
import MainNav from "@/components/shared/mainNav";
import { paths } from "@/paths";
import { ArrowLeft } from "@mui/icons-material";
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

export default async function GlobalError() {
  return (
    <>
      <MainNav />
      <AuthGuard />
      <Box component="main" sx={styleMain}>
        <Stack spacing={3} sx={styleStack}>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            500: houve um erro interno no sistema
          </Typography>
          <Typography
            color="text.secondary"
            variant="body1"
            sx={{ textAlign: "center" }}
          >
            Sugerimos tentar efetuar a operação novamente mais tarde.
          </Typography>
          <Button
            component={RouterLink}
            href={paths.home}
            startIcon={<ArrowLeft />}
            variant="contained"
          >
            Home
          </Button>
        </Stack>
      </Box>
    </>
  );
}
