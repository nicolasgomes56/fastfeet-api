import { HashCompare } from '@/application/account/cryptography/hash-comparer';
import { HashGenerator } from '@/application/account/cryptography/hash-generator';

export class FakerHasher implements HashGenerator, HashCompare {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash;
  }
}
