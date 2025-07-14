import { BaseCableInformation } from "@/types/cableInformation";
import { Box, FormControl, SxProps, TextField } from "@mui/material";

const styleForm: SxProps = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr 1fr 1fr", sm: "1fr 1fr 1fr 1fr" },
  gap: 2,
  margin: 1,
};

interface NoteFormInfoCableProps {
  cableInfo?: BaseCableInformation;
}

const defaultValues: BaseCableInformation = {
  idTrecho: 0,
  circuito: 0,
  identificacaoCabo: "",
  tagPrevisto: "",
  origem: "",
  destino: "",
  fase: "",
  comprimentoFase: 0,
  comprimentoTodasFases: 0,
  secao: 0,
};

const NoteFormInfoCable = ({
  cableInfo = defaultValues,
}: NoteFormInfoCableProps) => {
  return (
    <Box component="form" noValidate>
      <FormControl variant="standard" sx={styleForm}>
        <TextField
          id="circuito"
          disabled
          label="Circuito"
          variant="standard"
          value={cableInfo?.circuito}
          size="small"
        />
        <TextField
          id="tg-previsto"
          disabled
          label="Tag Previsto"
          variant="standard"
          value={cableInfo?.tagPrevisto}
          size="small"
        />
        <TextField
          id="origem"
          disabled
          label="Origem"
          variant="standard"
          value={cableInfo?.origem}
          size="small"
        />
        <TextField
          id="destino"
          disabled
          label="Destino"
          variant="standard"
          value={cableInfo?.destino}
          size="small"
        />
        <TextField
          id="fase"
          disabled
          label="Fase"
          variant="standard"
          value={cableInfo?.fase}
          size="small"
        />
        <TextField
          id="comp"
          disabled
          label="Comp (m)"
          variant="standard"
          value={cableInfo?.comprimentoFase}
          size="small"
        />
        <TextField
          id="comp-t"
          disabled
          label="Comp 3F(m)"
          variant="standard"
          value={cableInfo?.comprimentoTodasFases}
          size="small"
        />
        <TextField
          id="secao"
          disabled
          label="Seção (mm²)"
          variant="standard"
          value={cableInfo?.secao}
          size="small"
        />
      </FormControl>
    </Box>
  );
};

export default NoteFormInfoCable;
