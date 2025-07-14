import axios from "axios";
import { NextResponse } from "next/server";

const baseUrl = process.env.BASE_URL;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const id = searchParams.get("id");
    let status = 200;
    let res = {};
    if (!id) {
      return NextResponse.json(res, { status: 204 });
    }

    await axios
      .get(`${baseUrl}/trecho/${id}`, {
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
