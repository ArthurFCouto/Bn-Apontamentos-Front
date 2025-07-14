"use client";

import {
  Box,
  Button,
  LinearProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Add, FilterList, Update } from "@mui/icons-material";
import { NotationTable } from "@/components/apontamento/noteTable";
import AuthGuard from "@/components/app/auth/authGuard";
import MainNav from "@/components/shared/mainNav";
import { useEffect, useState } from "react";
import { Notation } from "@/types/notation";
import { notationClient } from "@/services/notation";
import { authClient } from "@/services/auth";
import MainAlert, { MainAlertProps } from "@/components/shared/mainAlert";
import NoteForm, { NoteFormProps } from "@/components/apontamento/noteForm";

export default function Apontamento() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notations, setNotations] = useState<Notation[]>([]);
  const [alert, setAlert] = useState<MainAlertProps>({
    open: false,
    message: "",
  });
  const [form, setForm] = useState<NoteFormProps>({
    open: false,
  });

  const handleAlertForm = (message: string) => {
    setAlert({
      open: true,
      message: message,
      severity: "success",
    });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleOpenForm = () => {
    setForm({ ...form, open: true });
  };

  const handleCloseForm = () => {
    setForm({ ...form, open: false });
  };

  const handleFilter = () => {
    setAlert({
      open: true,
      message: "Ainda estamos trabalhando na implantação desta funcionalidade.",
      severity: "warning",
    });
  };

  const updateList = async () => {
    setIsLoading(true);
    const { data, error } = await notationClient.getAll();
    if (error === 401 || error === 403 || error === 405) {
      setAlert({
        open: true,
        message: "Por favor, atualize a página.",
        severity: "error",
      });
      await authClient.signOut();
    } else if (data) {
      setNotations(data);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    updateList();
  }, []);
  return (
    <>
      <MainNav />
      <AuthGuard />
      <Box display={"flex"} marginLeft={8} flexDirection={"column"} padding={1}>
        <Stack flex={1} spacing={3}>
          <Stack
            spacing={3}
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
          >
            <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
              <Typography variant="h4">Painel de Apontamentos</Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Button
                  color="inherit"
                  startIcon={<FilterList fontSize="medium" />}
                  onClick={handleFilter}
                >
                  Filtrar
                </Button>
                <Button
                  color="inherit"
                  onClick={updateList}
                  startIcon={<Update fontSize="medium" />}
                >
                  Atualizar
                </Button>
              </Stack>
            </Stack>
            <Box>
              <Button
                startIcon={<Add fontSize="medium" />}
                variant="contained"
                onClick={handleOpenForm}
              >
                Lançar
              </Button>
            </Box>
          </Stack>
          {isLoading && <LinearProgress />}
          <NotationTable
            count={notations.length}
            page={1}
            rows={notations}
            rowsPerPage={notations.length}
          />
        </Stack>
        <MainAlert
          message={alert.message}
          open={alert.open}
          onClose={handleCloseAlert}
          severity={alert.severity}
        />
        <NoteForm
          open={form.open}
          onClose={handleCloseForm}
          setAlert={handleAlertForm}
        />
      </Box>
    </>
  );
}
