import RouterLink from "next/link";
import type { Metadata } from "next";
import { Box, Button, Stack, SxProps, Typography } from "@mui/material";
import { ArrowLeft } from "@mui/icons-material";
import { paths } from "@/paths";
import MainNav from "@/components/shared/mainNav";
import AuthGuard from "@/components/app/auth/authGuard";

const styleMain: SxProps = {
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  marginLeft: 8,
  minHeight: "100%",
};

const styleStack: SxProps = { alignItems: "center", maxWidth: "md" };

export const metadata = { title: `Internal Server Error` } satisfies Metadata;

export default async function Error() {
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
