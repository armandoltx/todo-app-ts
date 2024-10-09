import { useRef, useState } from "react"
import { TodoId, TodoIdCompleted, TodoIdTitle, type Todo as TodoType } from "../types"

interface Props extends TodoType {
  onRemoveTodo: ({id}: TodoId) => void
  onToggleCompleteTodo: ({id, completed} : TodoIdCompleted) => void
  onTitlechange: ({ id, title }: TodoIdTitle) => void
}
// explicacion de lo de arriba
// interface Props {
//   todo: TodoType
//   onRemoveTodo: (id: string) => void
// }

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  onRemoveTodo,
  onToggleCompleteTodo,
  onTitlechange,
  // isEditing,
  setIsEditing
}) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompleteTodo({
      id,
      completed: event.target.checked
    })
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        onTitlechange({ id, title: editedTitle })
      }

      if (editedTitle === '') onRemoveTodo(id)
      setIsEditing('')
    }

    if (e.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing('')
    }
  }

  return(
    <>
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={completed}
        onChange={handleChangeCheckbox}
      />
      <label>{title}</label>
      <button
        className="destroy"
        onClick={() => { onRemoveTodo({id}) }}
      />
    </div>

    <input
      className='edit'
      value={editedTitle}
      onChange={(e) => { setEditedTitle(e.target.value) }}
      onKeyDown={handleKeyDown}
      onBlur={() => { setIsEditing('') }}
      ref={inputEditTitle}
    />
    </>
  )
}