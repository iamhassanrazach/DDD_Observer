import type { ProductId, ProductName, PriceNumber, StockLevel } from "./types.js"

// Product entity — uses branded types, never raw primitives
export type Product = {
  readonly id: ProductId
  readonly name: ProductName
  readonly price: PriceNumber
  readonly stock: StockLevel
}
