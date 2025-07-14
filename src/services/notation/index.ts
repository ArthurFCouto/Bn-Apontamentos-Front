import type { Notation, NotationSubmit } from "@/types/notation";
import axios from "axios";

class NotationClient {
  async getAll(): Promise<{ data?: Notation[] | []; error?: number }> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("/api/apontamento", {
        params: { token: token },
      });

      console.log("Response", response);

      if (response.status === 200 && Array.isArray(response.data)) {
        return { data: response.data };
      }

      return { data: [] };
    } catch (error: any) {
      return { error: error.status };
    }
  }

  async create(
    request: NotationSubmit
  ): Promise<{ data?: string; error?: string }> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post("/api/apontamento", {
        token: token,
        idTrecho: request.idTrecho,
        matriculaUsuario: request.matriculaUsuario,
        tagReal: request.tagReal,
        metragemInicio: request.metragemInicio,
        metragemFim: request.metragemFim,
        observacao: request.observacao,
        dataLancamento: request.dataLancamento,
      });

      console.log("Response", response);

      if (response.status === 200) {
        return { data: response.data };
      }

      return {};
    } catch (error: any) {
      return { error: error.message };
    }
  }
}

export const notationClient = new NotationClient();
