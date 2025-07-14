"use client";

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

export default async function NotFound() {
  return (
    <>
      <MainNav />
      <Box component="main" sx={styleMain}>
        <Stack spacing={3} sx={styleStack}>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            404: A página não foi encontrada
          </Typography>
          <Typography
            color="text.secondary"
            variant="body1"
            sx={{ textAlign: "center" }}
          >
            Ou você tentou alguma rota suspeita ou chegou aqui por engano. Seja
            qual for, tente usar a navegação.
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
