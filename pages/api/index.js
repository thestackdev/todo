import clientPromise from 'lib/mongodb'

export default async function (req, res) {
  const client = await clientPromise
  const collection = client.db('todo').collection('todos')

  const posts = await collection.find({}).toArray()

  switch (req.method) {
    case 'GET':
      res.status(200).json(posts)
      break
    case 'POST':
      const post = req.body
      const result = await collection.insertOne(post)
      res.status(201).json(result.ops[0])
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
