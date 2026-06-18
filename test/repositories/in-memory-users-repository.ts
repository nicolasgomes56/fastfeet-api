import { User } from '@/domain/entities/user';
import { UserRepository } from '@/domain/repositories/user-repository';

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = [];

  // create é um método do repositório de usuários, que recebe um usuário e retorna void
  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  // findByCpf é um método do repositório de usuários, que recebe um cpf e retorna um usuário ou null
  async findByCpf(cpf: string): Promise<User | null> {
    const user = this.items.find((user) => user.cpf === cpf);
    return user || null;
  }
}
