/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `events` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[membershipNumber]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "memberPrice" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "nonMemberPrice" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'KES';

-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "currency" SET DEFAULT 'KES';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "approvalStatus" "MembershipStatus" DEFAULT 'PENDING',
ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedBy" TEXT,
ADD COLUMN     "cvUrl" TEXT,
ADD COLUMN     "isMember" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isOnboarded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastPaymentAmount" DOUBLE PRECISION,
ADD COLUMN     "lastPaymentDate" TIMESTAMP(3),
ADD COLUMN     "licenseUrl" TEXT,
ADD COLUMN     "membershipNumber" TEXT,
ADD COLUMN     "membershipType" TEXT,
ADD COLUMN     "otherDocumentsUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "subscriptionStartDate" TIMESTAMP(3),
ADD COLUMN     "subscriptionStatus" TEXT DEFAULT 'INACTIVE';

-- CreateTable
CREATE TABLE "event_registrations" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "paymentMethod" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentId" TEXT,
    "isAttended" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_registrations_paymentId_key" ON "event_registrations"("paymentId");

-- CreateIndex
CREATE INDEX "event_registrations_eventId_idx" ON "event_registrations"("eventId");

-- CreateIndex
CREATE INDEX "event_registrations_paymentId_idx" ON "event_registrations"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_membershipNumber_key" ON "users"("membershipNumber");
