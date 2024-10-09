import { TODO_FILTERS } from "../consts"

export interface Todo {
  id: string
  title: string
  completed: boolean
}

export type TodoId = Pick<Todo, 'id'>
// export type TodoId = Omit<Todo, 'completed' | 'title'> seria lo mismo
export type TodoTitle = Pick<Todo, 'title'>
export type TodoCompleted = Pick<Todo, 'completed'>
export type TodoIdCompleted = Pick<Todo, 'id' | 'completed'>
export type TodoIdTitle = Pick<Todo, 'id' | 'title'>

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]

export type ListOfTodos = Todo[]
