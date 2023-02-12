import { StateContext } from '@/providers/state'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'

export default function Navbar() {
  const [profileOptionsOpened, setProfileOptionsOpened] = useState(false)
  const { data: session } = useSession()
  const state = useContext(StateContext)
  const router = useRouter()

  function handleSession() {
    if (session) signOut()
    else router.push('/login')
  }

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className={`inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:${
                !state.sidebarOpened && 'hidden'
              } hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon
                onClick={() => state.setSidebarOpened((e) => !e)}
                className="w-6 h-6 md:hidden"
              />
            </button>
            <a href="/" className="flex ml-2 md:mr-24">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Todo App
              </span>
            </a>
          </div>
          <div className="flex items-center relative">
            <div className="flex items-center ml-3">
              <div>
                <button
                  type="button"
                  onClick={() => setProfileOptionsOpened((e) => !e)}
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Open user menu</span>
                  {session.user?.image ? (
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  ) : (
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <span className="font-medium text-gray-600 dark:text-gray-300">
                        {session.user?.name
                          ? session.user.name[0]
                          : session.user?.email[0]}
                      </span>
                    </div>
                  )}
                </button>
              </div>
              <div
                className={`z-50 absolute top-6 right-0 ${
                  profileOptionsOpened ? 'inline' : 'hidden'
                } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                id="dropdown-user"
              >
                <div className="px-4 py-3" role="none">
                  <p
                    className="text-sm text-gray-900 dark:text-white"
                    role="none"
                  >
                    {session.user?.name}
                  </p>
                  <p
                    className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                    role="none"
                  >
                    {session.user?.email}
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://auth.fullstacklab.org/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={handleSession}
                      className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
