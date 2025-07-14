"use client";

import { notationClient } from "@/services/notation";
import { NotationSubmit } from "@/types/notation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";

const schema = zod.object({
  tag: zod.string().min(1, { message: "Informe a tag real" }),
  valueIni: zod
    .string()
    .regex(/^\d+$/, { message: "Informe um número válido" }),
  valueEnd: zod
    .string()
    .regex(/^\d+$/, { message: "Informe um número válido" }),
  notation: zod.string().optional(),
  date: zod.string().min(1, { message: "Informe a data de lançamento" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  tag: "",
  valueIni: "0",
  valueEnd: "0",
  notation: "",
  date: "",
} satisfies Values;

interface NoteFormInputProps {
  isDisabled: boolean;
  idTrecho: number;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  closeModal: (message?: string) => void;
}

const NoteFormInput = ({
  isDisabled,
  idTrecho,
  isLoading,
  setIsLoading,
  closeModal,
}: NoteFormInputProps) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = useCallback(
    async (values: Values): Promise<void> => {
      setIsLoading(true);

      const request: NotationSubmit = {
        idTrecho: idTrecho,
        matriculaUsuario: 0,
        tagReal: values.tag ?? "",
        metragemInicio: Number(values.valueIni),
        metragemFim: Number(values.valueEnd),
        observacao: values.notation,
        dataLancamento: new Date(`${values.date}T00:00:00`).toISOString(),
      };

      const { error } = await notationClient.create(request);

      if (error) {
        if (error.includes("401")) {
          closeModal(error);
          return;
        }
        setError("root", { type: "server", message: error });
        setIsLoading(false);
        return;
      }

      closeModal("Registro incluído com sucesso");
    },
    [setIsLoading, idTrecho, setError, errors, closeModal]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} margin={1}>
        <Grid size={4}>
          <Controller
            disabled={isDisabled}
            control={control}
            name="tag"
            render={({ field }) => (
              <FormControl error={Boolean(errors.tag)}>
                <InputLabel>Tag Real</InputLabel>
                <OutlinedInput {...field} label="Tag Real" />
                {errors.tag ? (
                  <FormHelperText>{errors.tag.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={4}>
          <Controller
            disabled={isDisabled}
            control={control}
            name="valueIni"
            render={({ field }) => (
              <FormControl error={Boolean(errors.valueIni)}>
                <InputLabel>Metr. Inicial</InputLabel>
                <OutlinedInput {...field} label="Metragem" />
                {errors.valueIni ? (
                  <FormHelperText>{errors.valueIni.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={4}>
          <Controller
            disabled={isDisabled}
            control={control}
            name="valueEnd"
            render={({ field }) => (
              <FormControl error={Boolean(errors.valueEnd)}>
                <InputLabel>Metr. Final</InputLabel>
                <OutlinedInput {...field} label="Metragem" />
                {errors.valueEnd ? (
                  <FormHelperText>{errors.valueEnd.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            disabled={isDisabled}
            control={control}
            name="notation"
            render={({ field }) => (
              <FormControl
                error={Boolean(errors.notation)}
                sx={{ width: "100%" }}
              >
                <InputLabel>Observações</InputLabel>
                <OutlinedInput
                  {...field}
                  fullWidth
                  label="Observações"
                  type="text"
                />
                {errors.notation ? (
                  <FormHelperText>{errors.notation.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
        </Grid>
        <Grid
          size={3}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"end"}
        >
          <Typography color={isDisabled ? "textDisabled" : "textPrimary"}>
            Data de Lançamento
          </Typography>
        </Grid>
        <Grid size={4}>
          <Controller
            disabled={isDisabled}
            control={control}
            name="date"
            render={({ field }) => (
              <FormControl error={Boolean(errors.date)}>
                <OutlinedInput {...field} type="date" />
                {errors.date ? (
                  <FormHelperText>{errors.date.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
        </Grid>
        <Grid
          size={5}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"end"}
        >
          <Button
            type="reset"
            variant="text"
            sx={{ marginRight: 2 }}
            onClick={() => closeModal()}
          >
            Cancelar
          </Button>
          <Button
            disabled={isLoading || isDisabled}
            type="submit"
            variant="contained"
          >
            Apontar
          </Button>
        </Grid>
        {errors.root ? (
          <Grid size={12}>
            <Alert color="error">{errors.root.message}</Alert>
          </Grid>
        ) : null}
      </Grid>
    </form>
  );
};

export default NoteFormInput;
