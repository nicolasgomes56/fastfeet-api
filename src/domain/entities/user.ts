import { UserRole } from '@/domain/enums/user-role-enum';
import { Entity } from '@/shared/entity';
import { UniqueEntityID } from '@/shared/unique-entity-id';

export interface UserProps {
  name: string;
  cpf: string;
  password: string;
  role: UserRole;
}

// Classe que representa um usuário
export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get password() {
    return this.props.password;
  }

  get role() {
    return this.props.role;
  }

  // Método Factory para criar um novo usuário
  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(props, id);
    return user;
  }
}
