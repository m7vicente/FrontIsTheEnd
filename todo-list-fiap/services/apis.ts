import axios, { type Method } from "axios";

export const executeRequest = (
  endpoint: String,
  method: Method,
  body?: any
) => {
  const headers = { "Content-Type": "application/json" } as any;

  const accessToken = localStorage.getItem("accessToken");

  if (!!accessToken)
    headers["Authorization"] = `Bearer  ${accessToken}` as string;

  const url = `http://localhost:3000/api/${endpoint}`;

  return axios.request({
    url,
    method,
    data: !!body ? body : "",
    headers,
    timeout: 30000
  });
};
