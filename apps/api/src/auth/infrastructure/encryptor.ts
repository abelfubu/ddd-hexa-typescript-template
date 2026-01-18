import { compare, hash } from 'bcryptjs'
import { type EncryptorPort } from '../application/encryptor.port'

export const Encryptor: EncryptorPort = {
  hash: (plainText) => {
    return hash(plainText, 10)
  },
  compare: (plainText, hashedText) => {
    return compare(plainText, hashedText)
  },
}
