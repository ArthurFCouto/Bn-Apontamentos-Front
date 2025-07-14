import axios from "axios";
import InterceptiorError from "./interceptors/interceptorError";
import IntereptorResponse from "./interceptors/interceptorResponse";

const Api = axios.create({
  //baseURL: "",
});

Api.interceptors.response.use(
  (response) => IntereptorResponse(response),
  (error) => InterceptiorError(error)
);

export { Api };
