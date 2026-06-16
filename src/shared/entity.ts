import { UniqueEntityID } from './unique-entity-id';

// Classe base para entidades, que são objetos que possuem uma identidade única.
export abstract class Entity<Props> {
  private readonly _id: UniqueEntityID;
  protected props: Props;

  get id() {
    return this._id;
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props;
    this._id = id ?? new UniqueEntityID();
  }

  /**
   * Verifica se duas entidades são iguais.
   * @param entity A entidade a ser comparada.
   * @returns Um valor booleano indicando se as entidades são iguais.
   */
  equals(entity: Entity<Props>) {
    if (entity === this) return true;

    if (entity.id === this._id) return true;

    return false;
  }
}
