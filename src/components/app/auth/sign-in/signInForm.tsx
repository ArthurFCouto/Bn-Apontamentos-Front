"use client";

import { useCallback, useState } from "react";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { paths } from "@/paths";
import { authClient } from "@/services/auth";
import { useUser } from "@/hooks/useUser";

const schema = zod.object({
  matricula: zod
    .string()
    .min(8, { message: "A matricula deve ter 8 dígitos" })
    .max(8, { message: "A matricula deve ter 8 dígitos" })
    .regex(/^\d+$/, { message: "A matrícula deve conter apenas números" }),
  senha: zod
    .string()
    .min(1, { message: "Favor preencher a senha" })
    .max(8, { message: "A senha deve ter 8 caracteres" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  matricula: "",
  senha: "",
} satisfies Values;

const SignInForm = () => {
  const router = useRouter();
  const { checkSession } = useUser();
  const [showPassword, setShowPassword] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const CircularLoading = () =>
    isLoading ? <CircularProgress size={24} /> : <></>;

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = useCallback(
    async (values: Values): Promise<void> => {
      setIsLoading(true);
      const { error } = await authClient.signInWithPassword(values);

      if (error) {
        setError("root", { type: "server", message: error });
        setIsLoading(false);
        return;
      }

      await checkSession?.();
      router.refresh();
    },
    [router, setError]
  );

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Entrar</Typography>
        <Typography color="text.secondary" variant="body2">
          Ainda não tem cadastro?{" "}
          <Link
            component={RouterLink}
            href={paths.auth.signUp}
            underline="hover"
            variant="subtitle2"
          >
            Solicitar
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="matricula"
            render={({ field }) => (
              <FormControl error={Boolean(errors.matricula)}>
                <InputLabel>Matricula</InputLabel>
                <OutlinedInput
                  {...field}
                  disabled={isLoading}
                  label="Matricula"
                  type="text"
                />
                {errors.matricula ? (
                  <FormHelperText>{errors.matricula.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="senha"
            render={({ field }) => (
              <FormControl error={Boolean(errors.senha)}>
                <InputLabel>Senha</InputLabel>
                <OutlinedInput
                  {...field}
                  disabled={isLoading}
                  endAdornment={
                    showPassword ? (
                      <Visibility
                        cursor="pointer"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <VisibilityOff
                        cursor="pointer"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Senha"
                  type={showPassword ? "text" : "password"}
                />
                {errors.senha ? (
                  <FormHelperText>{errors.senha.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <div>
            <Link
              component={RouterLink}
              href={paths.auth.resetPassword}
              variant="subtitle2"
            >
              Esqueceu sua senha?
            </Link>
          </div>
          {errors.root ? (
            <Alert severity="error">{errors.root.message}</Alert>
          ) : null}
          <Button
            disabled={isLoading}
            endIcon={<CircularLoading />}
            type="submit"
            variant="contained"
          >
            Entrar
          </Button>
        </Stack>
      </form>
      <Alert severity="warning">
        Ainda estamos em fase de{" "}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          testes.
        </Typography>
      </Alert>
    </Stack>
  );
};

export default SignInForm;
