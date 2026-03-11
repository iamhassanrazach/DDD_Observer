# Domain: E-Commerce Inventory & Stock Management

## Business Context

This system models the inventory layer of an e-commerce platform selling clothing items.
The core business concern is maintaining accurate stock levels and reacting to stock changes
in real time — notifying the warehouse, updating the website, and alerting the team.

## The Entity: Product

A **Product** represents a clothing item available for sale. It has a unique identity (`ProductId`),
a name, a price, and a current stock level.

### Business Rules

1. **A product's stock level must never drop below zero.**
   If an order requests more units than are available, the operation is rejected with an error.

2. **Prices must always be positive.**
   A product cannot be listed with a negative or zero price.

3. **Only valid product names are accepted.**
   The catalogue currently supports: `Shoes`, `Shirt`, `Pants`.

4. **Stock levels and quantities must be non-negative integers.**
   Fractional units or negative counts make no business sense.

## State Change: `reduceStock(product, quantity)`

The primary domain operation. When a customer places an order:
- The requested quantity is subtracted from current stock.
- If the result would go below zero, an error is thrown — the order cannot be fulfilled.
- On success, a `StockReducedEvent` is emitted to all registered observers.

## Observer Reactions

The system uses the **Observer Pattern** to decouple stock changes from downstream effects:

| Condition | Observer Reaction |
|---|---|
| Stock drops below 5 | Email alert triggers a reorder process |
| Stock reaches 0 | Email marks the product as "Unavailable" on the website |
| Any stock change | Database persists the event with a timestamp |
| Product created | Email confirms listing; database records the new entry |
| Price updated | Email sends a price alert to subscribers |

## Why This Matters

The domain layer (`src/domain/`) contains zero knowledge of emails or databases.
It only emits events. The infrastructure layer (`src/infrastructure/`) listens and reacts.
This separation means business rules stay clean and side-effects can be swapped out without touching the core logic.
