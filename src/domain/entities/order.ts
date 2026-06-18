import { OrderStatus } from '@/domain/enums/order-status-enum';
import { AggregateRoot } from '@/shared/core/aggregate-root';
import { Optional } from '@/shared/core/types/optional';
import { UniqueEntityID } from '@/shared/unique-entity-id';

interface OrderProps {
  title: string;
  status: OrderStatus;
  createdAt: Date;
  pickedUpAt?: Date;
  deliveredAt?: Date;
  recipientId: UniqueEntityID;
  deliverymanId?: UniqueEntityID;
}

// Classe que representa um pedido
export class Order extends AggregateRoot<OrderProps> {
  get title(): string {
    return this.props.title;
  }

  get status(): string {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  // get updatedAt(): Date | undefined {
  //   return this.props.updatedAt;
  // }

  get pickedUpAt(): Date | undefined {
    return this.props.pickedUpAt;
  }

  get deliveredAt(): Date | undefined {
    return this.props.deliveredAt;
  }

  get recipientId(): UniqueEntityID {
    return this.props.recipientId;
  }

  get deliverymanId(): UniqueEntityID | undefined {
    return this.props.deliverymanId;
  }

  set status(status: OrderStatus) {
    this.props.status = status;
  }

  set pickedUpAt(pickedUpAt: Date | undefined) {
    this.props.pickedUpAt = pickedUpAt;
  }

  set deliveredAt(deliveredAt: Date | undefined) {
    this.props.deliveredAt = deliveredAt;
  }

  set deliverymanId(deliverymanId: UniqueEntityID | undefined) {
    this.props.deliverymanId = deliverymanId;
  }

  // Método factory para criar um novo pedido
  static create(props: Optional<OrderProps, 'createdAt' | 'status'>, id?: UniqueEntityID) {
    const order = new Order(
      {
        ...props,
        status: props.status ?? OrderStatus.PENDING,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return order;
  }
}
