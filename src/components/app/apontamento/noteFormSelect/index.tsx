"use client";

import { CuttingPlaneWithCable } from "@/types/cuttingPlane";
import { Clear } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
} from "@mui/material";
import { useEffect, useState } from "react";

const styleForm: SxProps = {
  display: "grid",
  gridTemplateColumns: "0.5fr 1fr 0.25fr",
  gap: 2,
  margin: 1,
};

export interface NoteFormSelectProps {
  cuttingPlanes: CuttingPlaneWithCable[];
  setIdCuttingPlane: (id: string) => void;
  idPlaneSelected: string;
  isLloading: boolean;
  setIdCable: (id: string) => void;
  cableIdSelected: string;
  clearBoth: () => void;
}

const NoteFormSelect = ({
  cuttingPlanes,
  setIdCuttingPlane,
  idPlaneSelected,
  isLloading,
  setIdCable,
  cableIdSelected,
  clearBoth,
}: NoteFormSelectProps) => {
  const [cableIdentifications, setcableIdentifications] = useState<
    { id: number; identificacaoCabo: string }[]
  >([]);
  const [isSelectedBoth, setIsSelectedBoth] = useState<boolean>(false);

  const handleChangePlaneId = (event: SelectChangeEvent) => {
    const selectedId = event.target.value;
    setIdCuttingPlane(selectedId);

    const plane = cuttingPlanes.find((p) => p.id.toString() === selectedId);
    setcableIdentifications(plane?.trechos ?? []);
    setIdCable("");
  };

  const handleChangeCableId = (event: SelectChangeEvent) => {
    setIdCable(event.target.value);
    setIsSelectedBoth(true);
  };

  const handleClearBoth = () => {
    setIdCuttingPlane("");
    setIdCable("");
    setIsSelectedBoth(false);
    clearBoth();
  };

  useEffect(() => {
    handleClearBoth();
  }, [cuttingPlanes]);

  return (
    <Box sx={styleForm}>
      <FormControl
        size="small"
        sx={{ m: 0 }}
        disabled={isLloading || isSelectedBoth}
      >
        <Select
          id="plano-de-corte"
          value={idPlaneSelected}
          onChange={handleChangePlaneId}
        >
          {cuttingPlanes.map((p) => (
            <MenuItem key={p.id} value={p.id.toString()}>
              {p.nome}
            </MenuItem>
          ))}
        </Select>
        {!isSelectedBoth && <FormHelperText>Plano de Corte</FormHelperText>}
      </FormControl>
      <FormControl
        size="small"
        sx={{ m: 0 }}
        disabled={
          isLloading || cableIdentifications.length === 0 || isSelectedBoth
        }
      >
        <Select
          value={cableIdSelected}
          onChange={handleChangeCableId}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {cableIdentifications.map((c) => (
            <MenuItem key={c.id} value={c.id.toString()}>
              {c.identificacaoCabo}
            </MenuItem>
          ))}
        </Select>
        {!isSelectedBoth && (
          <FormHelperText sx={{ textWrap: "nowrap" }}>Trecho</FormHelperText>
        )}
      </FormControl>
      {isLloading && (
        <CircularProgress
          size={24}
          sx={{ marginLeft: "auto", marginY: "auto" }}
        />
      )}
      {isSelectedBoth && !isLloading && (
        <IconButton
          aria-label="limpar"
          color="error"
          onClick={handleClearBoth}
          sx={{ marginLeft: "auto" }}
        >
          <Clear />
        </IconButton>
      )}
    </Box>
  );
};

export default NoteFormSelect;
