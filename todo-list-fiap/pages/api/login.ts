import { connect2db } from '@/middleweres/dbConnection'
import { UserModel } from '@/models/User'
import type { NextApiRequest, NextApiResponse } from 'next'
import { DefaultMsgResponse } from './types/DefaultMsgResponse'
import CryptoJS from 'crypto-js'

type Login = {
  login: String
  password: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<DefaultMsgResponse>) {
  try {
    if (req.method !== 'POST')
      return res.status(405).json({ error: 'Tá MALUCO? Método solicitado não existe' })

    const { MY_SUPER_SCRET_KEY } = process.env
    if (!MY_SUPER_SCRET_KEY) return res.status(500).json({ error: 'deu ruim, sem segredos' })

    const { login, password } = req.body as Login

    const existsUser = await UserModel.findOne({ email: login })
    if (!existsUser) return res.status(400).json({ error: 'Esse email e senha não pode!' })

    const bytes = CryptoJS.AES.decrypt(existsUser.password, MY_SUPER_SCRET_KEY)
    const savedPassword = bytes.toString(CryptoJS.enc.Utf8)

    if (savedPassword !== password)
      return res.status(400).json({ error: 'Esse email e senha não pode!' })

    return res.status(200).json({ msg: 'Bein Venido bonitooo' })
  } catch (ex) {
    console.log('Ocorreu um erro ao realizar login: ', ex)
    res.status(500).json({ error: 'Ocorreu erro no login, faz de novo ai!' })
  }
}

export default connect2db(handler)
