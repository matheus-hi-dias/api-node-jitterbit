CREATE TABLE IF NOT EXISTS "User" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR UNIQUE NOT NULL,
  "password" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS "Order" (
  "orderId" VARCHAR PRIMARY KEY,
  "value" NUMERIC,
  "creationDate" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Items" (
  "orderId" VARCHAR REFERENCES "Order"("orderId") ON DELETE CASCADE,
  "productId" INTEGER,
  "quantity" INTEGER,
  "price" NUMERIC
);