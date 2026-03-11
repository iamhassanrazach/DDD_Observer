import type { ProductId, ProductName, PriceNumber, StockLevel, Quantity } from "../product/types.js"

// Emitted when a new product is created in the system
export type ProductCreatedEvent = {
  readonly type: "ProductCreated"
  readonly productId: ProductId
  readonly name: ProductName
  readonly price: PriceNumber
  readonly stock: StockLevel
}

// Emitted when a product's price changes
export type PriceUpdatedEvent = {
  readonly type: "PriceUpdated"
  readonly productId: ProductId
  readonly oldPrice: PriceNumber
  readonly newPrice: PriceNumber
}

// Emitted when stock is reduced after a sale or adjustment
export type StockReducedEvent = {
  readonly type: "StockReduced"
  readonly productId: ProductId
  readonly newLevel: StockLevel
  readonly quantity: Quantity
}

// Discriminated union — enables exhaustive type-safe event handling in observers
export type DomainEvent = ProductCreatedEvent | PriceUpdatedEvent | StockReducedEvent
