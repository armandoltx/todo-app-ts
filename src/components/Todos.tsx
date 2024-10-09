import { useState } from "react"
import type { ListOfTodos, TodoId, TodoIdCompleted, TodoIdTitle } from "../types"
import { Todo } from "./Todo"

interface Props {
  todos: ListOfTodos
  onRemoveTodo: ({id}: TodoId) => void // se agrega void pq no retorna nada
  onToggleCompleteTodo: ({id, completed} : TodoIdCompleted) => void
  onTitlechange: ({ id, title }: TodoIdTitle) => void
}

export const Todos: React.FC<Props> = ({
  todos,
  onRemoveTodo,
  onToggleCompleteTodo,
  onTitlechange
}) => {
  const [isEditing, setIsEditing] = useState('')

  return(
    <ul className="todo-list">
      {todos.map(todo => (
        <li
          key={todo.id}
          onDoubleClick={() => setIsEditing(todo.id)}
          className={`
            ${todo.completed ? 'completed' : ''}
            ${isEditing === todo.id ? 'editing' : ''}
          `}
        >
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
            onToggleCompleteTodo={onToggleCompleteTodo}
            onTitlechange={onTitlechange}
            // isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </li>
      ))}
    </ul>
  )
}
