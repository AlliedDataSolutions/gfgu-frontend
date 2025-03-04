import axios from "axios";


const instance = axios.create();


export function postCall<TData>(
  url: string,
  requestBody: unknown,
): Promise<{data:TData}> {
  return instance.post(url, requestBody);
}

