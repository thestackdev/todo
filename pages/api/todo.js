import handleErrors from '@/helpers/errors'
import prisma from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'
import schema from 'schema/index'

export default async function (req, res) {
  const token = await getToken({ req })

  if (!token) {
    return res.status(401).send('Request not authorized')
  }

  const todoId = req.query?.id

  switch (req.method) {
    case 'GET':
      try {
        const categoryId = req.query?.category

        if (!categoryId) {
          throw new Error('Invalid category ID')
        }

        const todos = await prisma.todo.findMany({
          where: { categoryId: categoryId, userId: token.sub },
        })

        res.status(200).json({ success: true, data: todos })
      } catch (err) {
        handleErrors(err, res)
      }
      break

    case 'POST':
      try {
        const value = await schema.todoSchema.validateAsync(req.body)

        let categoryId = req.body?.categoryId

        if (!categoryId) {
          const category = await prisma.category.create({
            data: { title: 'Uncategorized', userId: token.sub },
          })
          categoryId = category.id
        }

        const data = await prisma.todo.create({
          data: {
            title: value.title,
            userId: token.sub,
            categoryId: categoryId,
          },
        })

        res.status(201).json({ success: true, data: data })
      } catch (error) {
        handleErrors(error, res)
      }
      break

    case 'PUT':
      try {
        await prisma.todo.update({
          where: { id: todoId },
          data: { completed: req.body?.completed },
        })
        res.status(200).send({ success: true })
      } catch (error) {
        handleErrors(error, res)
      }

      break

    case 'DELETE':
      try {
        await prisma.todo.delete({ where: { id: todoId } })
        res.status(200).send({ success: true })
      } catch (error) {
        handleErrors(error, res)
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
