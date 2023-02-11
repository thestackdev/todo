import joi from 'joi'

const categorySchema = joi.object({
  name: joi.string().required(),
})

const todoSchema = joi.object({
  data: joi.string().required(),
  category: joi.string().required(),
})

const getTodoSchema = joi.object({
  category: joi.string().required(),
})

export default { categorySchema, getTodoSchema, todoSchema }
