import clientPromise from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { getToken } from 'next-auth/jwt'
import schema from 'schema/index'

export default async function (req, res) {
  const client = await clientPromise
  const collection = client.db('todo').collection('todo')

  const token = await getToken({ req })

  console.log('token', req)

  if (!token) {
    return res.status(401).send('Request not authorized')
  }

  const todoId = req.query?.id

  try {
    switch (req.method) {
      case 'GET':
        const categoryId = req.query.category
        const todos = await collection
          .find({
            createdBy: new ObjectId(token.sub),
            category: categoryId,
          })
          .toArray()
        res.status(200).json(todos)
        break

      case 'POST':
        const todoSchema = await schema.todoSchema.validateAsync(req.body)

        const category = await client
          .db('todo')
          .collection('category')
          .findOne({ _id: new ObjectId(req.body.category) })

        if (!category) throw new Error('Category not found')

        const object = {
          ...todoSchema,
          isDone: false,
          createdAt: new Date(),
          createdBy: new ObjectId(token.sub),
        }

        const result = await collection.insertOne(object)

        if (!result) throw new Error('Unable to create TODO')
        res.status(201).json({ ...object, _id: result.insertedId })
        break

      case 'PUT':
        const todo = await collection.updateOne(
          { _id: new ObjectId(todoId) },
          { $set: { isDone: req.body.isDone } }
        )
        if (!todo) throw new Error('Todo not found')
        res.status(200).send('ok')
        break

      case 'DELETE':
        const deleted = await collection.deleteOne({
          _id: new ObjectId(todoId),
        })

        if (!deleted) throw new Error('Todo not found')

        res.status(200).send('ok')
        break

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.log(error)
    if (error?.details) {
      res.status(400).send(Array.from(error.details.map((e) => e.message)))
    } else res.status(500).send('Something went wrong')
  }
}
