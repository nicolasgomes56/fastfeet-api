
/**
 * @description Tipo que representa um objeto com propriedades opcionais
 * @extends Partial<T> - Herda de Partial<T>
 * @implements Omit<T, K> - Implementa Omit<T, K>
 * @template T - Tipo do objeto
 * @template K - Chaves do objeto que serão opcionais
 * @example
 * ```ts
 * interface User {
 *   id: string;
 *   name: string;
 *   email: string;
 * }
 * 
 * type OptionalUser = Optional<User, 'id'>;
 * ```
 */
export type Optional<T, K extends keyof T> = Partial<T> & Omit<T, K>;