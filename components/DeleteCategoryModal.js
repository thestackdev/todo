import { deleteCategory } from '@/helpers/api'
import { StateContext } from '@/providers/state'
import { ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function DeleteCategoryModal({}) {
  const state = useContext(StateContext)
  const router = useRouter()

  const { category } = router.query

  async function handleDelete() {
    deleteCategory(state.deleteCategoryId).then(() => {
      state.setCategories((e) =>
        e.filter((c) => c.id !== state.deleteCategoryId)
      )
      state.setDeleteCategoryId(null)
      if (category === state.deleteCategoryId) router.push('/')
    })
  }

  return (
    <div
      className={`fixed backdrop-blur-sm top-0 left-0 right-0 z-50 ${
        state.deleteCategoryId ? 'flex' : 'hidden'
      } items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}
    >
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <XMarkIcon
              onClick={() => state.setDeleteCategoryId(null)}
              className="w-5 h-5"
            />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <ExclamationCircleIcon className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this category and all it's
              content?
            </h3>
            <button
              onClick={handleDelete}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={() => state.setDeleteCategoryId(null)}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
