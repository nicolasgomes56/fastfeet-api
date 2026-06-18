import { FakerHasher } from '@test/cryptography/fake-hasher';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { UserRole } from '@/domain/enums/user-role-enum';
import { RegisterUserUseCase } from './register-user';

let inMemoryUserRepository: InMemoryUsersRepository;
let fakerHasher: FakerHasher;
let sut: RegisterUserUseCase;

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    fakerHasher = new FakerHasher();
    sut = new RegisterUserUseCase(inMemoryUserRepository, fakerHasher);
  });

  it('deve ser possível registrar um novo usuário', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '12345678901',
      password: 'password',
      role: UserRole.DELIVERY_MAN,
    });

    expect(result.isSuccess).toBe(true);
    expect(result.value).toEqual({
      user: inMemoryUserRepository.items[0],
    });
  });

  it('deve ser possivel registrar um novo usuário com senha hasheada', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '12345678901',
      password: '123456',
      role: UserRole.DELIVERY_MAN,
    });

    const hashedPassword = await fakerHasher.hash('123456');

    expect(result.isSuccess).toBe(true);
    expect(inMemoryUserRepository.items[0].password).toEqual(hashedPassword);
  });

  it('deve impedir o registro de um usuário com cpf duplicado', async () => {
    await sut.execute({
      name: 'John Doe',
      cpf: '12345678901',
      password: 'password',
      role: UserRole.DELIVERY_MAN,
    });

    const result = await sut.execute({
      name: 'John Doe',
      cpf: '12345678901',
      password: 'password',
      role: UserRole.DELIVERY_MAN,
    });

    expect(result.isFail).toBe(true);
    expect(result.message).toEqual('Já existe um usuário com este CPF');
  });
});
