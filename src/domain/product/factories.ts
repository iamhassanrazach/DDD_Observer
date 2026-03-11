import type { ProductId, ProductName, PriceNumber, StockLevel, Quantity } from "./types.js"

// Inline UUID v4 — avoids external dependency
function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
  })
}
import type { Product } from "./product.js"

// Smart constructor — price must be a positive number
export function createPrice(value: number): PriceNumber {
  if (value < 0) {
    throw new Error(`Invalid price: ${value}. Price must be a positive number.`)
  }
  return value as PriceNumber
}

// Smart constructor — quantity must be at least 1
export function createQuantity(value: number): Quantity {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`Invalid quantity: ${value}. Quantity must be a positive integer.`)
  }
  return value as Quantity
}

// Smart constructor — stock cannot be negative
export function createStockLevel(value: number): StockLevel {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`Invalid stock level: ${value}. Stock must be a non-negative integer.`)
  }
  return value as StockLevel
}

// Factory function — creates a valid Product entity
export function createProduct(
  name: ProductName,
  price: PriceNumber,
  stock: StockLevel,
): Product {
  if (name !== "Shoes" && name !== "Shirt" && name !== "Pants") {
    throw new Error(`Invalid product name: "${name}". Must be Shoes, Shirt, or Pants.`)
  }

  return {
    id: uuidv4() as ProductId,
    name,
    price,
    stock,
  }
}

// Domain operation — reduces stock level, enforces business rule: stock never below 0
export function reduceStock(product: Product, quantity: Quantity): Product {
  const newStockValue = product.stock - quantity

  if (newStockValue < 0) {
    throw new Error(
      `Cannot reduce stock for "${product.name}": only ${product.stock} units available, requested ${quantity}.`,
    )
  }

  return {
    ...product,
    stock: createStockLevel(newStockValue),
  }
}
