import { useState } from "react"
import { Todos } from "./components/Todos"
import { FilterValue, TodoTitle, type TodoId, type Todo as TodoType } from "./types"
import { TODO_FILTERS } from "./consts"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"

const mockTodos = [
  {
    id: "1",
    title: 'todo 1',
    completed: false
  },
  {
    id: "2",
    title: 'todo 2',
    completed: false
  },
  {
    id: "3",
    title: 'todo 3',
    completed: false
  }
]

const App = () => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({id}: TodoId) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed } : Pick<TodoType, 'id' | 'completed'>) => {
    const newTodos = todos.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          completed // sera el completed que le pasamos por parametro
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleUpdateTitle = ({ id, title } :Pick<TodoType, 'id' | 'title'>) => {
    const newTodos = todos.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          title // el nuevo titulo
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const handleAddTodo = ({title} : TodoTitle): void => {
    const newTodo = {
      id: crypto.randomUUID(), // crypto es un objeto de windows
      title,
      completed: false
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo}/>
      <Todos
        todos={filteredTodos}
        onRemoveTodo={handleRemove}
        onToggleCompleteTodo={handleCompleted}
        onTitlechange={handleUpdateTitle}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
