# Sistema de Controle de Assinaturas

Um sistema de gerenciamento de assinaturas desenvolvido com NestJS e Prisma.

## Descrição

Este projeto implementa um sistema de controle de assinaturas que permite gerenciar clientes, planos e assinaturas. O sistema foi desenvolvido seguindo os princípios da Clean Architecture, com separação clara entre as camadas de domínio, aplicação, interface e infraestrutura.

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações server-side em Node.js
- **Prisma**: ORM para acesso ao banco de dados
- **SQLite**: Banco de dados relacional
- **TypeScript**: Linguagem de programação tipada
- **Class Validator**: Validação de dados
- **Class Transformer**: Transformação de dados

## Estrutura do Projeto

O projeto segue a arquitetura Clean Architecture com as seguintes camadas:

- **Domain**: Contém as entidades e regras de negócio
- **Application**: Contém os casos de uso da aplicação
- **Interface**: Contém os controladores e DTOs
- **Infra**: Contém a implementação de repositórios e serviços externos

## Modelos de Dados

### Cliente
- `cod`: UUID do cliente
- `nome`: Nome do cliente
- `email`: Email do cliente

### Plano
- `cod`: UUID do plano
- `descricao`: Descrição do plano
- `custoMensal`: Custo mensal do plano

### Assinatura
- `cod`: UUID da assinatura
- `codCli`: UUID do cliente
- `codPlano`: UUID do plano
- `inicioFidelidade`: Data de início da fidelidade
- `fimFidelidade`: Data de fim da fidelidade
- `dataUltimoPagamento`: Data do último pagamento
- `custoFinal`: Custo final da assinatura
- `descricao`: Descrição da assinatura

## Formato de Data

A aplicação trabalha com datas no formato `YYYY/MM/DD HH:MM`. Este formato é usado tanto para entrada quanto para saída de dados.

### Exemplos:
- Data de início: `2023/01/01 10:00`
- Data de fim: `2025/01/30 12:00`

Para mais exemplos de uso do formato de data, consulte o arquivo `examples/date-format-example.md`.

## Instalação e Execução

```bash
# Instalação de dependências
$ npm install

# Execução em modo de desenvolvimento
$ npm run start:dev

# Execução em modo de produção
$ npm run start:prod
```

## Endpoints da API

### Planos
- `GET /plan`: Lista todos os planos
- `PATCH /plan/:cod`: Atualiza o custo mensal de um plano

### Assinaturas
- `POST /subscription`: Cria uma nova assinatura
- `GET /subscription`: Lista todas as assinaturas
- `GET /subscription/:status`: Lista assinaturas por status ('ativa' ou 'cancelada')
- `GET /subscription-client/:codCli`: Lista assinaturas por cliente
- `GET /subscriptionplan/:codPlano`: Lista assinaturas por plano

## Exemplos de Uso

### Criando uma Nova Assinatura

```bash
curl -X POST http://localhost:3001/subscription \
  -H "Content-Type: application/json" \
  -d '{
    "codCli": "9c27a3d8-3431-4484-a2f5-8f9aee9d0972",
    "codPlano": "6d4c66f5-6a1d-4a9a-a9c2-0a7f6d9a5c1a",
    "inicioFidelidade": "2023/01/01 10:00",
    "fimFidelidade": "2025/01/30 12:00",
    "dataUltimoPagamento": "2023/12/15 08:30",
    "custoFinal": 99.90,
    "descricao": "Assinatura Premium"
  }'
```
