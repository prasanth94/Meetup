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

async function insertDocument(client, document) {
  const db = await client.db('events')
  const collection = await db.collection('newsletter')
  const result = await collection.insertOne(document)
  return result
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'invalid email address' })
      return
    }
    let client
    try {
      client = await connectDatabase()
    } catch (error) {
      res.status(500).json({ message: 'database connection failed' })
      return
    }
    try {
      const result = await insertDocument(client, { email: userEmail })
      console.log(result)
      client.close()
    } catch (error) {
      res.status(500).json({ message: 'database insertion failed' })
      return
    }

    res.status(201).json({ message: 'you are signed up' })
  }
}
