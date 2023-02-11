import clientPromise from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import schema from 'schema/index'

export default async function (req, res) {
  const client = await clientPromise
  const collection = client.db('todo').collection('category')

  switch (req.method) {
    case 'GET':
      const categories = await collection
        .find({ createdBy: new ObjectId('63dbe27add437f32d1062e72') })
        .toArray()
      res.status(200).json(categories)
      break

    case 'POST':
      const value = await schema.categorySchema.validateAsync(req.body)
      const object = {
        ...value,
        createdAt: new Date(),
        createdBy: new ObjectId('63dbe27add437f32d1062e72'),
      }
      const result = await collection.insertOne(object)
      res.status(201).json({
        ...object,
        _id: result.insertedId,
      })
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
