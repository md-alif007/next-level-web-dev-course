-- CreateEnum
CREATE TYPE "SUBS_STATUS" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELED');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "subs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subsStatus" "SUBS_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subs_userId_key" ON "subs"("userId");

-- AddForeignKey
ALTER TABLE "subs" ADD CONSTRAINT "subs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
