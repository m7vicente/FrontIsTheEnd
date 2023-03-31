import { NextPage } from "next";

type HeaderProps = {
  setAccessToken(s: string): void;
};
export const Header: NextPage<HeaderProps> = ({ setAccessToken }) => {
  const mobile = window.innerWidth < 954;

  const userName = localStorage.getItem("name");
  const firstName = userName?.split(" ")[0] || "Anonimo";

  const signOut = () => {
    localStorage.clear();
    setAccessToken("");
  };

  return (
    <div className="container-header">
      <img src="/logo.svg" alt="logo-fiap" className="logo" />
      <button>
        <strong>+</strong> Adicionar tarefa
      </button>
      <div>
        <span>Olá, {firstName}</span>
        <img
          src={mobile ? "/exit-d.svg" : "exit-m.svg"}
          alt="Sair"
          onClick={signOut}
        />
      </div>
    </div>
  );
};
