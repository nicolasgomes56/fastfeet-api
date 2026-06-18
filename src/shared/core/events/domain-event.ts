import { UniqueEntityID } from '@/shared/unique-entity-id';

export interface DomainEvent {
  ocurredAt: Date;
  getAggregateId(): UniqueEntityID;
}
