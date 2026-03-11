import type { DomainEvent } from "../../domain/events/events.js"

// Observer type — any function that reacts to a domain event
export type Observer = (event: DomainEvent) => void

// Central registry — observers are added here and notified on every event
export const observers: Observer[] = []

// Dispatches an event to all registered observers
export function emit(event: DomainEvent): void {
  observers.forEach((observer) => observer(event))
}
