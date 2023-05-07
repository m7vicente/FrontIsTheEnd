import { Home } from "@/containers/Home";
import { Login } from "@/containers/Login";
import { useState, useEffect } from "react";

export default function Index() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      if (token) return setAccessToken(token);

      setAccessToken("");
    }
  }, []);

  if (accessToken === null) return <></>;

  return !accessToken ? (
    <Login setAccessToken={setAccessToken} />
  ) : (
    <Home setAccessToken={setAccessToken} />
  );
}
