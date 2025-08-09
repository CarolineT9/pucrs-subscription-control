import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.client.createMany({
    data: [
      { nome: 'Alice', email: 'alice@email.com' },
      { nome: 'Bob', email: 'bob@email.com' },
      { nome: 'Carol', email: 'carol@email.com' },
      { nome: 'David', email: 'david@email.com' },
      { nome: 'Eva', email: 'eva@email.com' },
      { nome: 'Frank', email: 'frank@email.com' },
      { nome: 'Grace', email: 'grace@email.com' },
      { nome: 'Helen', email: 'helen@email.com' },
      { nome: 'Ian', email: 'ian@email.com' },
      { nome: 'Julia', email: 'julia@email.com' },
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });