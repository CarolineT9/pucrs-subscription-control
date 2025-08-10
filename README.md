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
- **Swagger/OpenAPI**: Documentação da API

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


## Instalação e Execução

```bash
# Instalação de dependências
$ npm install

# Execução em modo de desenvolvimento
$ npm run start:dev

# Execução em modo de produção
$ npm run start:prod
```

## Documentação da API

A documentação da API está disponível através do Swagger UI. Após iniciar a aplicação, acesse:

```
http://localhost:3000/api
```

A interface do Swagger permite visualizar todos os endpoints disponíveis, seus parâmetros, respostas e testar as requisições diretamente pelo navegador.

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



```
