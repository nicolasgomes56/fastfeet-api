import { User } from '@/domain/entities/user';

// Interface para repositório de usuários
export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByCpf(cpf: string): Promise<User | null>;
}
