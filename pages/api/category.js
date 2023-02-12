import clientPromise from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import { getToken } from 'next-auth/jwt'
import schema from 'schema/index'

export default async function (req, res) {
  const client = await clientPromise
  const categoryCollection = client.db('todo').collection('category')
  const todoCollection = client.db('todo').collection('todo')

  const token = await getToken({ req })

  if (!token) {
    return res.status(401).send('Request not authorized')
  }

  switch (req.method) {
    case 'GET':
      const categories = await categoryCollection
        .find({ createdBy: new ObjectId(token.sub) })
        .toArray()
      res.status(200).json(categories)
      break

    case 'POST':
      const value = await schema.categorySchema.validateAsync(req.body)
      const object = {
        ...value,
        createdAt: new Date(),
        createdBy: new ObjectId(token.sub),
      }
      const result = await categoryCollection.insertOne(object)
      res.status(201).json({
        ...object,
        _id: result.insertedId,
      })
      break

    case 'DELETE':
      const id = req.query?.id

      await todoCollection.deleteMany({ category: id })

      const deleted = await categoryCollection.deleteOne({
        _id: new ObjectId(id),
      })

      if (!deleted) throw new Error('Category not found')
      res.status(200).send('ok')
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
