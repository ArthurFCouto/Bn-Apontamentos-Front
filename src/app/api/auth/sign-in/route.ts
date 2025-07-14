/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { NextResponse } from "next/server";

const baseUrl = process.env.BASE_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { matricula, senha } = body;
    let status = 200;
    let res = {};
    await axios
      .post(`${baseUrl}/usuario/login`, {
        matricula,
        senha,
      })
      .then(async (response) => {
        const { token, nome, matricula } = response.data.data;
        res = { token, nome, matricula };
      })
      .catch((error) => {
        status = error.status;
      });

    return NextResponse.json(res, { status: status });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
