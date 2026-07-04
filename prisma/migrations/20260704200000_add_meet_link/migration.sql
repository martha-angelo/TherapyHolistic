-- AlterTable: adiciona campos de Google Meet ao Booking
ALTER TABLE "Booking" ADD COLUMN "meetLink" TEXT;
ALTER TABLE "Booking" ADD COLUMN "calEventId" TEXT;
