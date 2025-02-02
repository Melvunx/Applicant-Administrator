import { useAuth } from "@/hook/use-auth";
import userAuthStore from "./auth";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { refreshToken } = useAuth();
const { accessToken, setAccessToken } = userAuthStore();

export class ApiError extends Error {
  constructor(
    public status: number,
    public data: Record<string, unknown>,
    message?: string
  ) {
    super(message || `API request failed with status ${status}`);
    this.name = "ApiError";
  }
}

const fetchApi = async <T>(
  url: string,
  {
    payload,
    method,
    headers = {},
    navigate,
  }: {
    payload?: Record<string, unknown>;
    method?: string;
    headers?: Record<string, string>;
    navigate?: (path: string) => void;
  } = {}
): Promise<T> => {
  method = method || (payload ? "POST" : "GET");

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const requestOptions: RequestInit = {
    method,
    credentials: "include",
    body: payload ? JSON.stringify(payload) : undefined,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
  };

  let r = await fetch(`http://localhost:5000/api${url}`, requestOptions);

  if (r.status === 401) {
    try {
      const newAccessToken = await refreshToken();

      if (!newAccessToken) {
        setAccessToken(null);
        if (navigate) navigate("/login");
        throw new ApiError(r.status, await r.json(), "Failed to refresh token");
      }

      setAccessToken(newAccessToken);

      requestOptions.headers = {
        ...requestOptions.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };

      r = await fetch(`http://localhost:5000/api${url}`, requestOptions);
    } catch (error) {
      setAccessToken(null);
      if (navigate) navigate("/login");
      throw error;
    }
  }

  const json = await r.json();

  if (!r.ok) {
    throw new ApiError(r.status, json);
  }

  console.log("The json after fetching : ", json);

  if (json.success && json.data) {
    console.log(json.message);
    return json.data as T;
  }

  return json.message as T;
};

export default fetchApi;
