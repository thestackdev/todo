export const getCategories = async () => {
  const category = await fetch('/api/category').then((res) => res.json())
  return category?.data
}

export const getTodos = async (category) => {
  const todos = await fetch(`/api/todo?category=${category}`).then((res) =>
    res.json()
  )
  return todos?.data
}

export const createTodo = async (todo) => {
  const newTodo = await fetch('/api/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json())
  return newTodo?.data
}

export const deleteTodo = async (id) => {
  await fetch(`/api/todo?id=${id}`, {
    method: 'DELETE',
  })
}

export const editTodo = async (todo) => {
  await fetch(`/api/todo?id=${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
}

export const createCategory = async (title) => {
  const response = await fetch('/api/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  }).then((res) => res.json())
  return response?.data
}

export const deleteCategory = async (id) => {
  await fetch(`/api/category?id=${id}`, {
    method: 'DELETE',
  })
}
