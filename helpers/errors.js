export default function handleErrors(err, res) {
  if (err.isJoi) {
    console.log(err)
    res.status(400).json({ error: 'Invalid request data' })
  } else if (err.code && err.code.startsWith('P')) {
    if (
      err.code === 'P2002' &&
      err.meta &&
      err.meta.target &&
      err.meta.target.includes('_key')
    ) {
      const fieldName = err.meta.target.split('_')[0]
      res.status(400).json({
        error: `A record with the same ${fieldName} already exists.`,
      })
    } else if (err.code === 'P2025') {
      res.status(404).json({ error: 'The query did not return any results.' })
    } else if (err.code === 'P2026') {
      res
        .status(400)
        .json({ error: 'The provided value for the query is invalid.' })
    } else if (err.code === 'P2016') {
      res.status(400).json({ error: 'A required field is missing.' })
    } else if (err.code === 'P2014') {
      res.status(404).json({
        error: 'A record with the specified primary key could not be found.',
      })
    } else if (err.code === 'P1011') {
      res.status(500).json({
        error: 'The Prisma client was unable to connect to the database.',
      })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    if (!err.message) {
      res.status(400).json({ error: 'Internal server error' })
    }
    res.status(500).json({ success: false, error: err.message })
  }
}
