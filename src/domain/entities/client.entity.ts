import crypto from 'crypto'

export class Client {
  cod: string  //uuid
  nome: string
  email: string

  constructor(props: { nome: string, email: string }, cod?: string) {
    Object.assign(this, props)
    this.cod = cod ?? crypto.randomUUID()
  }
}
