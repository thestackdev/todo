import clientPromise from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { getToken } from 'next-auth/jwt'
import schema from 'schema/index'

export default async function (req, res) {
  const client = await clientPromise
  const todoCollection = client.db('todo').collection('todo')
  const categoryCollection = client.db('todo').collection('category')

  const token = await getToken({ req })

  if (!token) {
    return res.status(401).send('Request not authorized')
  }

  const todoId = req.query?.id

  try {
    switch (req.method) {
      case 'GET':
        const categoryId = req.query.category
        const todos = await todoCollection
          .find({
            createdBy: new ObjectId(token.sub),
            category: categoryId,
          })
          .toArray()
        res.status(200).json(todos)
        break

      case 'POST':
        const todoSchema = await schema.todoSchema.validateAsync(req.body)

        let category = req.body.category

        const response = await client
          .db('todo')
          .collection('category')
          .findOne({ _id: new ObjectId(category) })

        if (!response) {
          const response = await categoryCollection.insertOne({
            name: 'Uncategorized',
            createdAt: new Date(),
            createdBy: new ObjectId(token.sub),
          })
          category = response.insertedId
        }

        const object = {
          ...todoSchema,
          isDone: false,
          category: category.toString(),
          createdAt: new Date(),
          createdBy: new ObjectId(token.sub),
        }

        const result = await todoCollection.insertOne(object)

        if (!result) throw new Error('Unable to create TODO')
        res.status(201).json({ ...object, _id: result.insertedId })
        break

      case 'PUT':
        const todo = await todoCollection.updateOne(
          { _id: new ObjectId(todoId) },
          { $set: { isDone: req.body.isDone } }
        )
        if (!todo) throw new Error('Todo not found')
        res.status(200).send('ok')
        break

      case 'DELETE':
        const deleted = await todoCollection.deleteOne({
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
