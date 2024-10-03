import type { ListOfTodos } from "../types"
import { Todo } from "./Todo"

interface Props {
  todos: ListOfTodos
  onRemoveTodo: (id: string) => void // se agrega void pq no retorna nada
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo }) => {
  return(
    <ul className="todo-list">
      {todos.map(todo => (
        <li
          key={todo.id}
          className={`${todo.completed ? 'completed' : ''}`}
        >
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
          />
        </li>
      ))}
    </ul>
  )
}
