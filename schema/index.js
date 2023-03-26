import joi from 'joi'

const categorySchema = joi.object({
  title: joi.string().required(),
})

const todoSchema = joi.object({
  title: joi.string().required(),
  categoryId: joi.string(),
})

const getTodoSchema = joi.object({
  category: joi.string().required(),
})

export default { categorySchema, getTodoSchema, todoSchema }
