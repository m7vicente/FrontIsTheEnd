import { NextPage } from "next";

type HeaderProps = {
  setAccessToken(s: string): void;
  showModal(): void;
};
export const Header: NextPage<HeaderProps> = ({
  setAccessToken,
  showModal
}) => {
  const mobile = window.innerWidth < 954;

  const userName = localStorage.getItem("name");
  const firstName = userName?.split(" ")[0] || "Anonimo";

  const signOut = () => {
    localStorage.clear();
    setAccessToken("");
  };

  return (
    <div className="container-header">
      <img src="/logo.svg" alt="Logo Fiap" className="logo" />
      <button onClick={showModal}>
        <span>+</span>Adicionar Tarefa
      </button>
      <div className="mobile">
        <span>Olá, {firstName}</span>
        <img src="/exit-m.svg" alt="Sair" onClick={signOut} />
      </div>
      <div className="desktop">
        <span>Olá, {firstName}</span>
        <img src="/exit-d.svg" alt="Sair" onClick={signOut} />
      </div>
    </div>
  );
};
