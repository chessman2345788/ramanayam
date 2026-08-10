type EventCallback<T = any> = (data: T) => void;

export type SystemEventType =
  | "PRODUCT_ADDED"
  | "PRODUCT_UPDATED"
  | "PRODUCT_DELETED"
  | "STOCK_UPDATED"
  | "ORDER_CREATED"
  | "PAYMENT_VERIFIED";

class EventBus {
  private listeners: Map<SystemEventType, Set<EventCallback>> = new Map();

  on<T = any>(event: SystemEventType, callback: EventCallback<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  emit<T = any>(event: SystemEventType, data: T): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => {
        try {
          cb(data);
        } catch (err) {
          console.error(`Error handling event ${event}:`, err);
        }
      });
    }
  }
}

export const eventBus = new EventBus();
