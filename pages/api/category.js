import { isAuthenticated } from '@/helpers/auth'
import handleErrors from '@/helpers/errors'
import prisma from '@/lib/prisma'
import schema from 'schema/index'

export default async function (req, res) {
  const user = await isAuthenticated(req)

  if (!user) return res.redirect('/login')

  switch (req.method) {
    case 'GET':
      try {
        const records = await prisma.category.findMany({
          where: { userId: user.sub },
        })
        return res.status(200).json({ success: true, data: records })
      } catch (err) {
        handleErrors(err, res)
      }
      break

    case 'POST':
      try {
        const value = await schema.categorySchema.validateAsync(req.body)
        const record = await prisma.category.create({
          data: {
            title: value.title,
            userId: user.sub,
          },
        })
        res.status(201).json({ success: true, data: record })
      } catch (err) {
        handleErrors(err, res)
      }
      break

    case 'DELETE':
      const id = req.query?.id

      try {
        if (!id) {
          throw new Error('Invalid ID')
        }

        await prisma.category.delete({ where: { id } })

        res.status(200).send({ success: true })
      } catch (err) {
        handleErrors(err, res)
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
