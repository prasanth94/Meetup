import { MongoClient } from 'mongodb'

async function connectDatabase() {
  var serverUrl =
    'mongodb+srv://cosmos:Hustle@2021@cluster0.hmzfh.mongodb.net/events?retryWrites=true&w=majority'

  const client = await MongoClient.connect(serverUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  return client
}

async function getCollection(client) {
  const db = client.db('events')
  const collection = await db.collection('comments')
  return collection
}

export default async function handler(req, res) {
  const eventId = req.query.eventId
  let client
  let collection
  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: 'database connection failed' })
    return
  }

  try {
    collection = await getCollection(client)
  } catch (error) {
    res.status(500).json({ message: 'connecting to collection got failed' })
    return
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'invalid input' })
      return
    }

    let newComment = {
      eventId,
      email,
      name,
      text,
    }

    const result = await collection.insertOne(newComment)
    newComment.id = result.insertedId
    res.status(201).json({ message: 'added comment', comment: newComment })
  }
  if (req.method === 'GET') {
    const documents = await collection
      .find()
      .filter({ eventId: eventId })
      .sort({ _id: -1 })
      .toArray()
    res.status(200).json({ comments: documents })
  }
}
