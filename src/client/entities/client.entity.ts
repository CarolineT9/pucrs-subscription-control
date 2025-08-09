import { Column, Entity, PrimaryColumn } from "typeorm";
import crypto from 'crypto'
@Entity()
export class Client {
  @PrimaryColumn()
  cod: string  //uuid
  @Column()
  nome: string;
  @Column()
  email: string;

  constructor(props:{
    nome: string,
    email: string
  }, 
    cod?: string)
    {
    Object.assign(this, props)
    this.cod = cod ?? crypto.randomUUID()
  }
}
