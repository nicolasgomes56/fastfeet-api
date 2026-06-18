import { DomainEvent } from './domain-event';

type DomainEventCallback = (event: DomainEvent) => Promise<void>;

/**
 * Permite que os *subscribers* (ouvintes) se registrem para receber
 * notificações quando um evento de domínio específico for disparado.
 */
export class DomainEvents {
  // Armazena os *subscribers* (ouvintes) organizados por nome de evento.
  private static handlersMap: Map<string, DomainEventCallback[]> = new Map();

  /**
   * (Subscribers) usam este método para ouvir um evento específico
   * @param callback Função que será chamada quando o evento for disparado
   * @param eventName Nome do evento que será ouvido
   */
  public static register(callback: DomainEventCallback, eventName: string) {
    // Verificar se já existe um handler para este evento
    const wasRegistered = DomainEvents.handlersMap.has(eventName);

    // Se não existir, cria um novo array de handlers para este evento
    if (!wasRegistered) {
      DomainEvents.handlersMap.set(eventName, []);
    }

    // Adiciona o novo callback à lista de handlers para este evento
    DomainEvents.handlersMap.get(eventName)?.push(callback);
  }

  /**
   * Repositórios chamam este método após persistirem os dados com sucesso.
   * @param domainEvents Array de eventos de domínio que serão disparados
   */
  public static async dispatchEventsForAggregate(domainEvents: DomainEvent[]) {
    for (const event of domainEvents) {
      const eventName = event.constructor.name;
      const handlers = DomainEvents.handlersMap.get(eventName) || [];

      for (const handler of handlers) {
        await handler(event);
      }
    }
  }
}
