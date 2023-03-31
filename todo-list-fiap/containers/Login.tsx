import { executeRequest } from "@/services/apis";
import { NextPage } from "next";
import { useState } from "react";

type LoginProps = {
  setAccessToken(s: string): void;
};

export const Login: NextPage<LoginProps> = ({ setAccessToken }) => {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const doLogin = () => {
    setLoading(true);
    if (
      !login ||
      login.trim().length < 1 ||
      !password ||
      password.trim().length < 6
    )
      return setError("Favo, preenche a baixo");

    const body = { password, login };

    try {
      executeRequest("login", "POST", body)
        .then((response) => {
          if (!response.data) return;
          const { token, email, name } = response.data;

          localStorage.setItem("accessToken", token);
          localStorage.setItem("email", email);
          localStorage.setItem("name", name);
          setAccessToken(token);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.data.error);
          setLoading(false);
        });
    } catch (e) {
      setError("Não foi possivel realizar login, tenta de novo ai");
      setLoading(false);
    }
  };

  return (
    <div className="container-login">
      <img src="/logo.svg" className="logo" />

      <div className="form">
        {error && <p className="error">{error}</p>}

        <div className="input">
          <div className="input">
            <img src="/mail.svg" />
            <input
              placeholder="Login"
              type="email"
              alt="email"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
            />
          </div>

          <div className="input">
            <img src="/lock.svg" alt="senha" />
            <input
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button onClick={doLogin} disabled={loading}>
            {loading ? "Carregando" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};
