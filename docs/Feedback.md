# Peer Review

## General Feedback
Great job on the domain implementation! The `Product` entity is clean, follows ubiquitous language well, and the folder structure clearly separates domain logic from infrastructure. I tested it thoroughly and have a few observations below.

## Specific Checks

- **Branded Types:** All domain values (`ProductId`, `PriceNumber`, `StockLevel`, `Quantity`) correctly use `unique symbol` — no primitive obsession here. Well done.
- **Validation:** Every factory function (`createPrice`, `createQuantity`, `createStockLevel`, `createProduct`) throws meaningful errors for impossible data. Passing `-50` to `createPrice` correctly rejects it instead of silently accepting it.
- **Observers:** The `Observer` type correctly accepts a single `DomainEvent` argument — no signature mismatches. Both `sendEmailMock` and `saveToDatabaseMock` follow the shared contract properly.
- **Readonly Events:** All domain event types use `readonly` on every field, which correctly prevents observers from accidentally mutating event data.

## Final Review
I tested the code with impossible data — negative prices, oversized orders, invalid product names — and every `try-catch` block handled the errors gracefully without crashing the app.

## Strengths

- Excellent use of discriminated unions for `DomainEvent`, enabling type-safe exhaustive handling in observers.
- The `reduceStock` function correctly enforces the core business rule that stock can never drop below zero.
- The `emit()` helper cleanly decouples the domain from the observer registry.

## Recommendation
Code meets all DDD criteria. ✅ Approving and ready to merge!