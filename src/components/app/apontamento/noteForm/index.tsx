"use client";

import { authClient } from "@/services/auth";
import { cableInformationClient } from "@/services/cableInformation";
import { cuttingClient } from "@/services/cuttingPlane";
import { BaseCableInformation } from "@/types/cableInformation";
import { CuttingPlaneWithCable } from "@/types/cuttingPlane";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import NoteFormInfoCable from "../noteFormInfoCable";
import NoteFormInput from "../noteFormInput";
import NoteFormSelect from "../noteFormSelect";

export interface NoteFormProps {
  open: boolean;
  onClose?: () => void;
  setAlert?: (message: string) => void;
}

const NoteForm = ({
  open = false,
  onClose = () => {},
  setAlert,
}: NoteFormProps) => {
  const [cuttingPlanes, setCuttingPlanes] = useState<CuttingPlaneWithCable[]>(
    []
  );
  const [planeIdSelected, setPlaneIdSelected] = useState<string>("");
  const [cableIdSelected, setCableIdSelected] = useState<string>("");
  const [cableInformation, setCableInformation] =
    useState<BaseCableInformation>();
  const [isLloading, setIsLoading] = useState<boolean>(true);
  const [isDisabledInput, setDisabledInput] = useState<boolean>(true);

  const clearCableInformation = () => {
    setCableInformation(undefined);
    setDisabledInput(true);
  };

  const getCuttingPlane = async () => {
    setIsLoading(true);
    const { data, error } = await cuttingClient.getAllWithCableIdentification();
    setIsLoading(false);
    if (error === 401 || error === 403 || error === 405) {
      await authClient.signOut();
      onClose();
    } else if (data) {
      setCuttingPlanes(data);
    }
  };

  const getCableInformation = async (id: string) => {
    if (!Boolean(id)) {
      return;
    }
    setIsLoading(true);
    const { data, error } =
      await cableInformationClient.getBaseCableInformation(id);
    setIsLoading(false);
    if (error === 401 || error === 403 || error === 405) {
      await authClient.signOut();
      onClose();
    } else if (data) {
      setCableInformation(data);
      setDisabledInput(false);
    }
  };

  const setIdCuttingPlane = (id: string) => {
    setPlaneIdSelected(id);
  };

  const setIdCable = (id: string) => {
    getCableInformation(id);
    setCableIdSelected(id);
  };

  const handleClose = (message?: string) => {
    if (message) {
      setAlert?.(message);
    }
    onClose();
  };

  useEffect(() => {
    if (open) {
      getCuttingPlane();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Novo Apontamento</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <DialogActions sx={{ paddingX: 0 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Paper elevation={2} sx={{ padding: 1 }}>
              <NoteFormSelect
                cuttingPlanes={cuttingPlanes}
                setIdCuttingPlane={setIdCuttingPlane}
                idPlaneSelected={planeIdSelected}
                isLloading={isLloading}
                setIdCable={setIdCable}
                cableIdSelected={cableIdSelected}
                clearBoth={clearCableInformation}
              />
              <NoteFormInfoCable cableInfo={cableInformation} />
            </Paper>
            <Paper>
              <NoteFormInput
                idTrecho={Number(cableIdSelected)}
                isDisabled={isDisabledInput}
                isLoading={isLloading}
                setIsLoading={(loading) => setIsLoading(loading)}
                closeModal={handleClose}
              />
            </Paper>
          </Box>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default NoteForm;
