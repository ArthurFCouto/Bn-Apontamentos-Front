/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseCableInformation } from "@/types/cableInformation";
import axios from "axios";

class CableInformationClient {
  async getBaseCableInformation(id: string): Promise<{
    data?: BaseCableInformation | null;
    error?: number;
  }> {
    if (id === undefined) return {};
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("/api/trecho", {
        params: { token: token, id: id },
      });

      if (response.status === 200) {
        return { data: response.data };
      }

      return {};
    } catch (error: any) {
      return { error: error.status };
    }
  }
}

export const cableInformationClient = new CableInformationClient();
