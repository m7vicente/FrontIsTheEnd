import { connect2db } from '@/middleweres/dbConnection'
import { UserModel } from '@/models/User'
import type { NextApiRequest, NextApiResponse } from 'next'
import { DefaultMsgResponse } from './types/DefaultMsgResponse'
import CryptoJS from 'crypto-js'

type Register = {
  name: String
  email: string
  password: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<DefaultMsgResponse>) {
  try {
    if (req.method !== 'POST')
      return res.status(405).json({ error: 'Tá MALUCO? Método solicitado não existe' })

    const { MY_SUPER_SCRET_KEY } = process.env
    if (!MY_SUPER_SCRET_KEY) return res.status(500).json({ error: 'deu ruim, sem segredos' })

    const { name, email, password } = req.body as Register

    if (!name || name.trim().length < 2)
      return res.status(400).json({ error: 'Esse nome não pode!' })

    if (!email || email.trim().length < 6 || !email.includes('@') || !email.includes('.'))
      return res.status(400).json({ error: 'Esse email não pode!' })

    if (!password || password.trim().length < 6)
      return res.status(400).json({ error: 'Essa senha não pode!' })

    const existsUser = await UserModel.findOne({ email })
    if (!existsUser) return res.status(400).json({ error: 'Esse email não pode!' })

    const passwordCyphered = CryptoJS.AES.encrypt(password, MY_SUPER_SCRET_KEY)

    const user = {
      name,
      email,
      password: passwordCyphered
    }

    await UserModel.create(user)

    return res.status(200).json({ msg: 'Sucesso, tu tá dentro!' })
  } catch (ex) {
    console.log('Ocorreu um erro ao realizar login: ', ex)
    res.status(500).json({ error: 'Ocorreu erro no login, faz de novo ai!' })
  }
}

export default connect2db(handler)
