import { Order } from '@/domain/entities/order';

// Interface para repositório de pedidos
export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>;
  abstract findById(id: string): Promise<Order | null>;
}
