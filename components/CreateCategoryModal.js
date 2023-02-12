import { createCategory } from '@/helpers/api'
import { StateContext } from '@/providers/state'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function CreateCategoryModal() {
  const state = useContext(StateContext)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    const name = e.target[0].value
    await createCategory(name).then((response) => {
      state.setCategories((e) => [...e, response])
      state.setCreateCategoryVisible(false)
      router.push(`/${response._id}`)
    })
  }

  return (
    <div
      id="create-category-modal"
      className={`fixed top-0 left-0 right-0 z-50 ${
        state.createCategoryVisible ? 'flex' : 'hidden'
      } items-center justify-center backdrop-blur-sm w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}
    >
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <XMarkIcon
              onClick={() => state.setCreateCategoryVisible(false)}
              className="w-5 h-5"
            />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Create a new category
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="My awesome category"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
