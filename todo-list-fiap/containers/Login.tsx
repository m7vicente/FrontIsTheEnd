export const Login = () => {
  return (
    <div className="container-login">
      <img src="/logo.svg" className="logo" />

      <div className="form">
        <div className="input">
          <div className="input">
            <img src="/mail.svg" />
            <input placeholder="Login" type="email" alt="email" />
          </div>

          <div className="input">
            <img src="/lock.svg" alt="senha" />
            <input placeholder="Senha" type="password" />
          </div>

          <button>Entrar</button>
        </div>
      </div>
    </div>
  );
};
