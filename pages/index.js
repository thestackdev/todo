import CreateCategoryModal from '@/components/CreateCategoryModal'
import DeleteCategoryModal from '@/components/DeleteCategoryModal'
import { createTodo } from '@/helpers/api'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Home() {
  function handleSubmit(e) {
    e.preventDefault()
    const newTodo = { data: e.target[0].value }
    createTodo(newTodo).then((todo) => {
      window.location.href = `/${todo.category}`
    })
  }

  return (
    <div>
      <CreateCategoryModal />
      <DeleteCategoryModal />
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            id="default-search"
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
    </div>
  )
}

Home.auth = true
