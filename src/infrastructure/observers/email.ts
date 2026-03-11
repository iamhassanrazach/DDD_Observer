import type { DomainEvent } from "../../domain/events/events.js"

// Mock email service — simulates sending transactional emails based on domain events
export const sendEmailMock = (event: DomainEvent): void => {
  if (event.type === "ProductCreated") {
    console.log(`📧 [Email] New product listed: "${event.name}" at $${event.price} — stock: ${event.stock} units.`)
  } else if (event.type === "PriceUpdated") {
    console.log(`📧 [Email] Price alert for product ${event.productId}: $${event.oldPrice} → $${event.newPrice}.`)
  } else if (event.type === "StockReduced") {
    if (event.newLevel === 0) {
      console.log(`📧 [Email] URGENT — Product ${event.productId} is now OUT OF STOCK. Marking as unavailable.`)
    } else if (event.newLevel < 5) {
      console.log(`📧 [Email] Low stock warning for product ${event.productId}: only ${event.newLevel} units left. Triggering reorder.`)
    } else {
      console.log(`📧 [Email] Stock update for product ${event.productId}: reduced by ${event.quantity}, now ${event.newLevel} units.`)
    }
  }
}
