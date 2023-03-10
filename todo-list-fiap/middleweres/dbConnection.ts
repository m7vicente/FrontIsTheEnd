import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

export const connect2db =
  (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const connectionState = mongoose.connections[0].readyState

    console.log('DB está conectado? ', connectionState === 1 ? 'Yeap' : 'HO NO')

    if (connectionState) return handler(req, res)

    const { DB_CONNECTION_STRING } = process.env

    if (!DB_CONNECTION_STRING || DB_CONNECTION_STRING === '')
      return res.status(500).json({ error: 'Não foi configurado a conn com banco' })

    mongoose.connection.on('connected', () => console.log('TO LIGADOO NO MONGO'))
    mongoose.connection.on('error', error => console.log('DEU RUIM NO MONGO', error))
    await mongoose.connect(DB_CONNECTION_STRING)

    return handler(req, res)
  }
