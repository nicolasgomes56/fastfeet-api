import { Result } from '../result';

export class CPF {
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(cpf: string): Result<CPF> {
    // Regex que aceita CPF com ou sem pontuação
    const cpfRegex = /(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{11}$)/;

    if (!cpfRegex.test(cpf)) {
      return Result.fail<CPF>('CPF inválido');
    }

    // Remove a pontuação para armazenar apenas os números
    const cleanCpf = cpf.replace(/\D/g, '');

    return Result.ok<CPF>(new CPF(cleanCpf));
  }

  public get formatted(): string {
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
