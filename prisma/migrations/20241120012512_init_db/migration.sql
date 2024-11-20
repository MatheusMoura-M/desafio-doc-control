-- CreateEnum
CREATE TYPE "OrderOrigin" AS ENUM ('DIGITALIZED', 'ELECTRONIC');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('SERVICE_CONTRACT', 'SERVICE_NOTE');

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "origin" "OrderOrigin" NOT NULL,
    "type" "OrderType" NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "emitter" TEXT NOT NULL,
    "taxValue" DECIMAL(10,2) NOT NULL,
    "netValue" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);
