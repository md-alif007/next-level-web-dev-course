/*
  Warnings:

  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `subs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripeSubscriptionId` to the `subs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subs" ADD COLUMN     "stripeSubscriptionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "subs_stripeSubscriptionId_key" ON "subs"("stripeSubscriptionId");
