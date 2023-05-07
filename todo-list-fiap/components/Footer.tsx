import { NextPage } from "next";
import React, { useState } from "react";

type FooterProps = {
  showModal(e: boolean): void;
};

export const Footer: NextPage<FooterProps> = ({ showModal }) => {
  const year = new Date().getFullYear();
  return (
    <div className="container-footer">
      <button onClick={(e) => showModal(true)}>
        <img src="/add.svg" alt="Adicionar tarefa" /> Adicionar Tarefa
      </button>
      <span>© Copyright {year}. Todos os direitos reservados.</span>
    </div>
  );
};
