/**
 * Representa um resultado de uma operação que pode falhar ou ter sucesso
 * Tem como objetivo substituir o uso de try-catch em operações
 */
export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly value?: T;
  public readonly message?: string;

  // Mantido isFail como alias por retrocompatibilidade com seu teste
  public get isFail(): boolean {
    return !this.isSuccess;
  }

  protected constructor(isSuccess: boolean, value?: T, message?: string) {
    this.isSuccess = isSuccess;
    this.value = value;
    this.message = message;
  }

  // Retorna um Result de sucesso
  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, value, '');
  }

  // Retorna um Result de erro
  public static fail<U>(message: string): Result<U> {
    return new Result<U>(false, undefined, message);
  }

  // Retorna um Result baseado em um valor
  public static by<U>(value?: U): Result<U> {
    return value !== null && value !== undefined
      ? Result.ok<U>(value)
      : Result.fail<U>('Valor é nulo');
  }
}
