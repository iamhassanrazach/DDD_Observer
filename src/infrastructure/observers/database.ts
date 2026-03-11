import type { DomainEvent } from "../../domain/events/events.js"

// Mock database service — simulates persisting event data
export const saveToDatabaseMock = (event: DomainEvent): void => {
  const record = {
    eventType: event.type,
    timestamp: new Date().toISOString(),
    payload: event,
  }
  console.log(`💾 [Database] Event persisted: ${JSON.stringify(record)}`)
}
