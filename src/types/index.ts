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


export type ListOfTodos = Todo[]
