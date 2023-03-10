import { createContext, useState } from 'react'

export const StateContext = createContext(null)

export default function StateProvider({ children }) {
  const [todos, setTodos] = useState([])
  const [categories, setCategories] = useState([])
  const [sidebarOpened, setSidebarOpened] = useState(false)
  const [createCategoryVisible, setCreateCategoryVisible] = useState(false)
  const [deleteCategoryId, setDeleteCategoryId] = useState(false)

  return (
    <StateContext.Provider
      value={{
        todos,
        categories,
        setTodos,
        setCategories,
        sidebarOpened,
        setSidebarOpened,
        createCategoryVisible,
        setCreateCategoryVisible,
        deleteCategoryId,
        setDeleteCategoryId,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}
