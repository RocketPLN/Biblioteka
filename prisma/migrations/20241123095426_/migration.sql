-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('NOVEL', 'ROMANCE', 'SCI_FI', 'POETRY', 'MYSTERY', 'ADVENTURE', 'FANTASY', 'COMEDY', 'THRILLER', 'DRAMA', 'NON_FICTION', 'LITERARY', 'HISTORY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "roles" "Roles"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "release" TIMESTAMP(3) NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "genre" "Genre" NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "booksId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3) NOT NULL DEFAULT NOW() + '2 months'::interval,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;
