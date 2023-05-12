import { NextPage } from "next";
import { useState } from "react";

type FiltersProps = {
  previsionDateStart: string;
  previsionDateEnd: string;
  status: number;
  setStatus(s: number): void;
  setPrevisionDateStart(s: string): void;
  setPrevisionDateEnd(s: string): void;
};
export const Filters: NextPage<FiltersProps> = ({
  status,
  setStatus,
  previsionDateStart,
  setPrevisionDateStart,
  previsionDateEnd,
  setPrevisionDateEnd
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { display: "Todos", value: 0 },
    { display: "Concluida", value: 1 },
    { display: "Em Andamento", value: 2 }
  ];

  return (
    <div className="container-filter">
      <div className="title">
        <span>Tarefas</span>
        <img
          src="/filter.svg"
          alt="Filtrar tarefas"
          onClick={() => setShowFilters(!showFilters)}
        />
        <div className="form">
          <div>
            <label>Data prevista de conclusão:</label>
            <input
              type="date"
              value={previsionDateStart}
              onChange={(e) => setPrevisionDateStart(e.target.value)}
            />
          </div>
          <div>
            <label>até</label>
            <input
              type="date"
              value={previsionDateEnd}
              onChange={(e) => setPrevisionDateEnd(e.target.value)}
            />
          </div>
          <div className="separator" />

          <div>
            <label>Status</label>
            <select
              value={status}
              onChange={(event) => setStatus(parseInt(event.target.value))}
            >
              {statusOptions.map(({ display, value }) => (
                <option value={value}>{display}</option>
              ))}
            </select>
          </div>
        </div>

        {showFilters && (
          <div className="mobile-filters">
            <div>
              <label>Data de previsão de:</label>
              <input
                type="date"
                value={previsionDateStart}
                onChange={(e) => setPrevisionDateStart(e.target.value)}
              />
            </div>
            <div>
              <label>Data de previsão até:</label>
              <input
                type="date"
                value={previsionDateEnd}
                onChange={(e) => setPrevisionDateEnd(e.target.value)}
              />
            </div>

            <div>
              <label>Status</label>
              <select
                value={status}
                onChange={(event) => setStatus(parseInt(event.target.value))}
              >
                {statusOptions.map(({ display, value }) => (
                  <option value={value}>{display}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
