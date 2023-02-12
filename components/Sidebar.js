import { getCategories } from '@/helpers/api'
import { StateContext } from '@/providers/state'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

export default function Sidebar({ children }) {
  const router = useRouter()
  const { category } = router.query
  const state = useContext(StateContext)

  useEffect(() => {
    getCategories().then((categories) => state.setCategories(categories))
  }, [])

  return (
    <div>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          state.sidebarOpened ? '+translate-x-full' : '-translate-x-full'
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <button
            onClick={() => state.setCreateCategoryVisible(true)}
            className={`flex flex-row items-center justify-center p-2 text-base font-bold text-gray-900 rounded-lg bg-primary-100 dark:bg-primary-600 mb-5 dark:text-white w-full text-center`}
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Create
          </button>
          <ul className="space-y-2">
            {state.categories.map((e) => (
              <li
                className={`flex flex-row items-center justify-between group rounded-lg ${
                  category === e._id && 'bg-primary-100 dark:bg-primary-600'
                }  hover:bg-gray-100 dark:hover:bg-gray-700`}
                key={e._id}
              >
                <Link
                  onClick={() => state.setSidebarOpened(false)}
                  href={`/${e._id}`}
                  className={`flex items-center p-2 text-base font-normal text-gray-900 dark:text-white `}
                >
                  <span className="ml-3">{e.name}</span>
                </Link>
                <XMarkIcon
                  onClick={() => state.setDeleteCategoryId(e._id)}
                  className="hidden group-hover:flex w-5 h-5 mr-2 dark:text-white cursor-pointer"
                />
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">{children}</div>
      </div>
    </div>
  )
}
