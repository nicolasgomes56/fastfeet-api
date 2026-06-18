import { User } from '@/domain/entities/user';
import { UserRole } from '@/domain/enums/user-role-enum';
import { UserRepository } from '@/domain/repositories/user-repository';
import { Result } from '@/shared/result';
import { HashGenerator } from '../cryptography/hash-generator';

interface RegisterUserUseCaseRequest {
  name: string;
  cpf: string;
  password: string;
  role: UserRole;
}

interface RegisterUserUseCaseResponse {
  user: User;
}

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute(request: RegisterUserUseCaseRequest): Promise<Result<RegisterUserUseCaseResponse>> {
    const { name, cpf, password, role } = request;

    const userAlreadyExists = await this.userRepository.findByCpf(cpf);

    if (userAlreadyExists) {
      return Result.fail('Já existe um usuário com este CPF');
    }

    const passwordHashed = await this.hashGenerator.hash(password);

    const user = User.create({
      name,
      cpf,
      password: passwordHashed,
      role,
    });

    await this.userRepository.create(user)

    return Result.ok({ user });
  }
}
