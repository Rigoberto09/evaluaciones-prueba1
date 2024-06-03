-- CreateTable
CREATE TABLE "Productos" (
    "productcode" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "tax" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "clientes" (
    "CustomerCode" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pedidos" (
    "code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productcode" TEXT NOT NULL,
    "CustomerCode" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "SubTotal" TEXT NOT NULL,
    "Total" TEXT NOT NULL,
    "others" TEXT NOT NULL,
    "address" TEXT NOT NULL
);
