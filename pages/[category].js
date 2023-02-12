import CreateCategoryModal from '@/components/CreateCategoryModal'
import DeleteCategoryModal from '@/components/DeleteCategoryModal'
import Spinner from '@/components/Spinner'
import { createTodo, deleteTodo, editTodo, getTodos } from '@/helpers/api'
import { StateContext } from '@/providers/state'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

export default function Category() {
  const router = useRouter()
  const { category } = router.query
  const state = useContext(StateContext)

  useEffect(() => {
    if (category) getTodos(category).then((todos) => state.setTodos(todos))
  }, [category])

  async function handleDelete(id) {
    await deleteTodo(id).then(() => {
      state.setTodos((e) => e.filter((e) => e._id !== id))
    })
  }

  async function handleEdit(todo) {
    await editTodo(todo).then(() => {
      state.setTodos((e) => (e._id === todo._id ? todo : e))
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newTodo = {
      data: e.target[0].value,
      category,
    }
    createTodo(newTodo).then((todo) => {
      state.setTodos((e) => [...e, todo])
    })
    e.target[0].value = ''
  }

  if (!state.todos) return <Spinner />

  return (
    <div>
      <CreateCategoryModal />
      <DeleteCategoryModal />
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <label
          htmlFor="todo"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Submit
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            id="todo"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write a new todo..."
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create
          </button>
        </div>
      </form>
      <div className="w-full flex max-w-xl mt-6 flex-col mx-auto">
        {state.todos.map((e) => (
          <div
            key={e._id}
            className="flex items-center gap-2 group p-2 rounded cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-600"
          >
            <div>
              <input
                id={e._id}
                type="checkbox"
                defaultChecked={e.isDone}
                onChange={() => {
                  handleEdit({ ...e, isDone: !e.isDone })
                }}
                className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={e._id}
                className={`ml-2 text-lg font-medium text-gray-900 dark:text-gray-300 ${
                  e.isDone && 'line-through'
                }`}
              >
                {e.data}
              </label>
            </div>
            <XMarkIcon
              onClick={() => handleDelete(e._id)}
              className="hidden group-hover:block w-5 h-5 ml-auto cursor-pointer text-gray-500 dark:text-gray-400"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

Category.auth = true
