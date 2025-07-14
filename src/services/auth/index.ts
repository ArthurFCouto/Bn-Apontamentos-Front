/* eslint-disable @typescript-eslint/no-explicit-any */

import type { User } from "@/types/user";
import axios from "axios";

export interface SignInWithPasswordParams {
  matricula: string;
  senha: string;
}

class AuthClient {
  async signInWithPassword(
    params: SignInWithPasswordParams
  ): Promise<{ error?: string }> {
    try {
      const response = await axios.post("/api/auth/sign-in", params);
      if (response.status === 200) {
        const { token, nome, matricula } = response.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify({ nome, matricula }));
        return {};
      }

      return { error: "Usuário ou senha incorretos." };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    try {
      const token = sessionStorage.getItem("token");
      const user = sessionStorage.getItem("user");
      if (user && token) {
        const parsed = JSON.parse(user.toString());
        return {
          data: {
            matricula: parsed.matricula,
            nome: parsed.nome,
            token: token.toString(),
          },
        };
      }
      return {
        error: "Usuário não autenticado.",
      };
    } catch (error: any) {
      return {
        error: `Não foi possível recuperar os dados do usuário. + ${error.message}`,
      };
    }
  }

  async signOut(): Promise<{ error?: string }> {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    return {};
  }
}

export const authClient = new AuthClient();
