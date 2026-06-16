import { randomUUID } from 'node:crypto';

/**
 * Gera um ID único para uma entidade, podendo ser string ou number.
 * Recebe o valor como parâmetro, se não for passado, gera um ID aleatório.
 * Verifica a igualdade entre duas entidades
 */
export class UniqueEntityID {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }

  equals(id: UniqueEntityID) {
    return id.toValue() === this.value;
  }
}
