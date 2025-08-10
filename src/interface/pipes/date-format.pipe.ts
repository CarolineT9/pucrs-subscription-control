import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class DateFormatPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) return value;

    // Se for um objeto, processa cada propriedade que pode ser uma data
    if (typeof value === 'object' && !Array.isArray(value)) {
      const result = { ...value };
      
      // Lista de propriedades que esperamos que sejam datas
      const dateProperties = ['inicioFidelidade', 'fimFidelidade', 'dataUltimoPagamento'];
      
      for (const prop of dateProperties) {
        if (prop in result && result[prop]) {
          try {
            // Se já for uma instância de Date, não precisa converter
            if (result[prop] instanceof Date) {
              continue;
            }
            
            // Se for uma string no formato YYYY/MM/DD HH:MM, converte para Date
            if (typeof result[prop] === 'string') {
              const datePattern = /^(\d{4})\/(\d{2})\/(\d{2})\s(\d{2}):(\d{2})$/;
              const match = result[prop].match(datePattern);
              
              if (match) {
                const [_, year, month, day, hours, minutes] = match;
                result[prop] = new Date(
                  parseInt(year),
                  parseInt(month) - 1, // Mês em JavaScript é 0-indexed
                  parseInt(day),
                  parseInt(hours),
                  parseInt(minutes)
                );
              } else {
                // Se não estiver no formato esperado, tenta converter normalmente
                result[prop] = new Date(result[prop]);
                
                // Verifica se a data é válida
                if (isNaN(result[prop].getTime())) {
                  throw new Error(`Data inválida para o campo ${prop}`);
                }
              }
            }
          } catch (error) {
            throw new BadRequestException(
              `Formato de data inválido para o campo ${prop}. Use o formato YYYY/MM/DD HH:MM`
            );
          }
        }
      }
      
      return result;
    }
    
    return value;
  }
}