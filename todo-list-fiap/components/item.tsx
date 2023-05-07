import { Task } from "@/types/Task"
import { NextPage } from "next"

type ItemProps = {
  task: Task
  selectTask(t: Task): void
}

export const Item: NextPage<ItemProps> = ({ task, selectTask }) => {
  const isTaskFinished = task?.finishDate || false

  const getDataText = () => {
    if (isTaskFinished)
      return `Concluida em: ${new Date(task.finishDate).toLocaleDateString()}`

    return `Conclusão em: ${new Date(
      task.finishPrevisionDate
    ).toLocaleDateString()}`
  }
  return (
    <div
      className={"container-item " + (isTaskFinished ? "" : "active")}
      onClick={() => (isTaskFinished ? null : selectTask(task))}
    >
      <img
        src={isTaskFinished ? "checked.svg" : "not-checked.svg"}
        alt={isTaskFinished ? "Tarefa concluida" : "Tarefa aberta"}
      />
      <div>
        <p className={isTaskFinished ? "finished" : ""}>{task.name}</p>
        <span>{getDataText()}</span>
      </div>
    </div>
  )
}
