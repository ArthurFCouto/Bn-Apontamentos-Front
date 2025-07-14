/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { NextResponse } from "next/server";

const baseUrl = process.env.BASE_URL;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    let status = 200;
    let res = {};
    await axios
      .get(`${baseUrl}/apontamento`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        res = response.data.data;
      })
      .catch((error) => {
        status = error.status;
      });

    return NextResponse.json(res, { status: status });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      token,
      idTrecho,
      matriculaUsuario,
      tagReal,
      metragemInicio,
      metragemFim,
      observacao,
      dataLancamento,
    } = body;
    const bodySend = {
      idTrecho,
      matriculaUsuario,
      tagReal,
      metragemInicio,
      metragemFim,
      observacao,
      dataLancamento,
    };
    let status = 200;
    let res = {};

    console.log("Body send", bodySend);

    await axios
      .post(`${baseUrl}/apontamento`, bodySend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        res = response.data.data;
      })
      .catch((error) => {
        status = error.status;
      });

    return NextResponse.json(res, { status: status });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
