// Branded Types — eliminates primitive obsession
export type ProductId = string & { readonly __brand: unique symbol }
export type ProductName = "Shoes" | "Shirt" | "Pants"
export type PriceNumber = number & { readonly __brand: unique symbol }
export type StockLevel = number & { readonly __brand: unique symbol }
export type Quantity = number & { readonly __brand: unique symbol }
