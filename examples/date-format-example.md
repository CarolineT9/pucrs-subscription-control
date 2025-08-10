# Exemplos de Uso do Formato de Data

A aplicação agora trabalha com datas no formato `YYYY/MM/DD HH:MM`. Abaixo estão alguns exemplos de como usar este formato nas requisições e o que esperar nas respostas.

## Criando uma Nova Assinatura

### Requisição

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

### Resposta

```json
{
  "cod": "f8a7b6c5-d4e3-4f2a-1b0c-9d8e7f6a5b4c",
  "codCli": "9c27a3d8-3431-4484-a2f5-8f9aee9d0972",
  "codPlano": "6d4c66f5-6a1d-4a9a-a9c2-0a7f6d9a5c1a",
  "inicioFidelidade": "2023/01/01 10:00",
  "fimFidelidade": "2025/01/30 12:00",
  "dataUltimoPagamento": "2023/12/15 08:30",
  "custoFinal": 99.90,
  "descricao": "Assinatura Premium"
}
```

## Consultando Assinaturas

### Requisição

```bash
curl -X GET http://localhost:3001/subscription
```

### Resposta

```json
[
  {
    "codSubscription": "f8a7b6c5-d4e3-4f2a-1b0c-9d8e7f6a5b4c",
    "codCli": "9c27a3d8-3431-4484-a2f5-8f9aee9d0972",
    "codPlano": "6d4c66f5-6a1d-4a9a-a9c2-0a7f6d9a5c1a",
    "inicioFidelidade": "2023/01/01 10:00",
    "fimFidelidade": "2025/01/30 12:00",
    "dataUltimoPagamento": "2023/12/15 08:30",
    "custoFinal": 99.90,
    "descricao": "Assinatura Premium",
    "status": "ativa"
  }
]
```

## Consultando Assinaturas por Plano

### Requisição

```bash
curl -X GET http://localhost:3001/subscriptionplan/6d4c66f5-6a1d-4a9a-a9c2-0a7f6d9a5c1a
```

### Resposta

```json
[
  {
    "codSubscription": "f8a7b6c5-d4e3-4f2a-1b0c-9d8e7f6a5b4c",
    "codCli": "9c27a3d8-3431-4484-a2f5-8f9aee9d0972",
    "codPlano": "6d4c66f5-6a1d-4a9a-a9c2-0a7f6d9a5c1a",
    "inicioFidelidade": "2023/01/01 10:00",
    "fimFidelidade": "2025/01/30 12:00",
    "dataUltimoPagamento": "2023/12/15 08:30",
    "custoFinal": 99.90,
    "descricao": "Assinatura Premium",
    "status": "ativa"
  }
]
```

## Notas Importantes

1. Todas as datas na aplicação agora são formatadas como `YYYY/MM/DD HH:MM`
2. Ao enviar datas para a API, você deve usar este formato
3. Todas as respostas da API retornarão datas neste formato
4. O sistema aceita tanto o novo formato quanto objetos Date padrão do JavaScript