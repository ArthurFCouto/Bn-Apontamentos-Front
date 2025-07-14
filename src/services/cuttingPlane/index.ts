/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CuttingPlaneWithCable } from "@/types/cuttingPlane";
import axios from "axios";

class CuttingClient {
  async getAllWithCableIdentification(): Promise<{
    data?: CuttingPlaneWithCable[] | null;
    error?: number;
  }> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("/api/plano-corte/trecho", {
        params: { token: token },
      });

      if (response.status === 200) {
        return { data: response.data };
      }

      return { data: [] };
    } catch (error: any) {
      return { error: error.status };
    }
  }
}

export const cuttingClient = new CuttingClient();
