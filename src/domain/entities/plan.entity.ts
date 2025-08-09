import crypto from 'crypto'
export class Plan {
  cod: string;
  nome: string;
  custoMensal: number;

  constructor(props: { nome: string; custoMensal: number }, cod?: string) {
    Object.assign(this, props);
    this.cod = cod ?? crypto.randomUUID();
  }
}
