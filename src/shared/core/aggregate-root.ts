import { Entity } from '../entity';
import { DomainEvent } from './events/domain-event';

/**
 * Essa classe serve para dar poder de disparar eventos de domínio
 * para as entidades que herdarem dela.
 * @extends Entity<Props> - Herda de Entity
 */
export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = [];

  // Pega os eventos de domínio que foram gerados pelo aggregate root
  public get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  // Adiciona um evento de domínio ao aggregate root
  protected addDomainEvent(domainEvent: DomainEvent) {
    this._domainEvents.push(domainEvent);
  }

  // Limpa os eventos de domínio que foram gerados pelo aggregate root
  public clearEvents() {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
}
