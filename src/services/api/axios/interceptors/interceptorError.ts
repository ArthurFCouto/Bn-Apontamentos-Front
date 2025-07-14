import { AxiosError } from "axios";

export default function InterceptiorError(error: AxiosError) {
  if (error.response) {
    const { data }: any = error.response;

    error.response.data = {
      ...data,
      error: "Houve um erro durante a requisição.",
    };
  }
  return Promise.reject(error);
}
