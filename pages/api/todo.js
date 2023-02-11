import clientPromise from 'lib/mongodb'
import { ObjectId } from 'mongodb'
import schema from 'schema/index'

export default async function (req, res) {
  const client = await clientPromise
  const collection = client.db('todo').collection('todo')

  try {
    switch (req.method) {
      case 'GET':
        const todos = await collection
          .find({ createdBy: new ObjectId('63dbe27add437f32d1062e72') })
          .toArray()
        res.status(200).json(todos)
        break

      case 'POST':
        const todoSchema = await schema.todoSchema.validateAsync(req.body)

        console.log(req.body.category)

        const category = await client
          .db('todo')
          .collection('category')
          .findOne({ _id: new ObjectId(req.body.category) })

        if (!category) throw new Error('Category not found')

        console.log(category)

        const object = {
          ...todoSchema,
          createdAt: new Date(),
          createdBy: new ObjectId('63dbe27add437f32d1062e72'),
        }
        const result = await collection.insertOne(object)
        res.status(201).json({
          ...object,
          _id: result.insertedId,
        })
        res.status(200).json({ collection: category })
        break

      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    if (error?.details) {
      res.status(400).send(Array.from(error.details.map((e) => e.message)))
    } else res.status(500).send('Something went wrong')
  }
}
