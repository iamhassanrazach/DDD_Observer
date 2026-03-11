import { createPrice, createQuantity, createStockLevel, createProduct, reduceStock } from "./src/domain/product/factories.js"
import { observers, emit } from "./src/infrastructure/observers/observer.js"
import { sendEmailMock } from "./src/infrastructure/observers/email.js"
import { saveToDatabaseMock } from "./src/infrastructure/observers/database.js"

// ─── Register Observers ───────────────────────────────────────────────────────
observers.push(sendEmailMock)
observers.push(saveToDatabaseMock)

console.log("=== E-Commerce Inventory Domain — DDD + Observer Pattern ===\n")

// ─── Test 1: Valid product creation ──────────────────────────────────────────
console.log("--- Test 1: Creating valid products ---")

try {
  const shoes = createProduct("Shoes", createPrice(100), createStockLevel(20))
  console.log("✅ Created:", shoes)
  emit({ type: "ProductCreated", productId: shoes.id, name: shoes.name, price: shoes.price, stock: shoes.stock })

  const shirt = createProduct("Shirt", createPrice(45), createStockLevel(8))
  console.log("✅ Created:", shirt)
  emit({ type: "ProductCreated", productId: shirt.id, name: shirt.name, price: shirt.price, stock: shirt.stock })
} catch (error) {
  console.error(error instanceof Error ? error.message : "Unknown error")
}

// ─── Test 2: Reduce stock — normal sale ──────────────────────────────────────
console.log("\n--- Test 2: Normal stock reduction ---")

try {
  const pants = createProduct("Pants", createPrice(80), createStockLevel(10))
  const quantity = createQuantity(3)
  const updated = reduceStock(pants, quantity)
  console.log(`✅ Stock reduced from ${pants.stock} → ${updated.stock}`)
  emit({ type: "StockReduced", productId: updated.id, newLevel: updated.stock, quantity })
} catch (error) {
  console.error(error instanceof Error ? error.message : "Unknown error")
}

// ─── Test 3: Low stock warning (triggers observer alert) ─────────────────────
console.log("\n--- Test 3: Low stock warning ---")

try {
  const shirt = createProduct("Shirt", createPrice(60), createStockLevel(5))
  const quantity = createQuantity(2)
  const updated = reduceStock(shirt, quantity)
  console.log(`✅ Stock reduced from ${shirt.stock} → ${updated.stock} (low stock!)`)
  emit({ type: "StockReduced", productId: updated.id, newLevel: updated.stock, quantity })
} catch (error) {
  console.error(error instanceof Error ? error.message : "Unknown error")
}

// ─── Test 4: Out of stock (triggers unavailable alert) ───────────────────────
console.log("\n--- Test 4: Out of stock ---")

try {
  const shoes = createProduct("Shoes", createPrice(120), createStockLevel(2))
  const quantity = createQuantity(2)
  const updated = reduceStock(shoes, quantity)
  console.log(`✅ Stock reduced from ${shoes.stock} → ${updated.stock} (out of stock!)`)
  emit({ type: "StockReduced", productId: updated.id, newLevel: updated.stock, quantity })
} catch (error) {
  console.error(error instanceof Error ? error.message : "Unknown error")
}

// ─── Test 5: IMPOSSIBLE — stock goes negative (business rule violation) ───────
console.log("\n--- Test 5: Impossible — order exceeds available stock ---")

try {
  const pants = createProduct("Pants", createPrice(75), createStockLevel(3))
  const quantity = createQuantity(10)
  const updated = reduceStock(pants, quantity) // should throw
  emit({ type: "StockReduced", productId: updated.id, newLevel: updated.stock, quantity })
} catch (error) {
  console.error("❌ Caught error:", error instanceof Error ? error.message : "Unknown error")
}

// ─── Test 6: IMPOSSIBLE — negative price ─────────────────────────────────────
console.log("\n--- Test 6: Impossible — negative price ---")

try {
  const shoes = createProduct("Shoes", createPrice(-50), createStockLevel(10)) // should throw
  console.log(shoes)
} catch (error) {
  console.error("❌ Caught error:", error instanceof Error ? error.message : "Unknown error")
}

// ─── Test 7: IMPOSSIBLE — invalid product name ───────────────────────────────
console.log("\n--- Test 7: Impossible — invalid product name ---")

try {
  // @ts-expect-error intentionally wrong type to test runtime guard
  const product = createProduct("Hat", createPrice(30), createStockLevel(5))
  console.log(product)
} catch (error) {
  console.error("❌ Caught error:", error instanceof Error ? error.message : "Unknown error")
}

// ─── Test 8: Price update event ──────────────────────────────────────────────
console.log("\n--- Test 8: Price update event ---")

try {
  const shirt = createProduct("Shirt", createPrice(50), createStockLevel(15))
  const oldPrice = shirt.price
  const newPrice = createPrice(65)
  console.log(`✅ Price updated: $${oldPrice} → $${newPrice}`)
  emit({ type: "PriceUpdated", productId: shirt.id, oldPrice, newPrice })
} catch (error) {
  console.error(error instanceof Error ? error.message : "Unknown error")
}

console.log("\n=== All tests complete ===")
