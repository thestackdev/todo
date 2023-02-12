export const getCategories = async () => {
  const category = await fetch('/api/category').then((res) => res.json())
  return category
}

export const getTodos = async (category) => {
  const todos = await fetch(`/api/todo?category=${category}`).then((res) =>
    res.json()
  )
  return todos
}

export const createTodo = async (todo) => {
  const newTodo = await fetch('/api/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json())
  return newTodo
}

export const deleteTodo = async (id) => {
  await fetch(`/api/todo?id=${id}`, {
    method: 'DELETE',
  })
}

export const editTodo = async (todo) => {
  console.log(todo)
  await fetch(`/api/todo?id=${todo._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
}

export const createCategory = async (name) => {
  const newCategory = await fetch('/api/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  }).then((res) => res.json())
  return newCategory
}
