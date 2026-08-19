-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."ContactStatus" AS ENUM ('NEW', 'READ', 'RESPONDED');

-- CreateEnum
CREATE TYPE "public"."ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "public"."Article" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "coverSrc" TEXT NOT NULL,
    "coverAlt" TEXT NOT NULL,
    "coverBlur" TEXT,
    "category" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "public"."ContentStatus" NOT NULL DEFAULT 'PUBLISHED',

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContactSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "projectType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "public"."ContactStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estimatedArea" TEXT,
    "style" TEXT,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverSrc" TEXT NOT NULL,
    "coverAlt" TEXT NOT NULL,
    "coverBlur" TEXT,
    "gallery" JSONB NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "year" TEXT NOT NULL,
    "scope" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "status" "public"."ContentStatus" NOT NULL DEFAULT 'PUBLISHED',

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Service" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "imageSrc" TEXT,
    "imageAlt" TEXT,
    "imageBlur" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SiteSetting" (
    "id" TEXT NOT NULL DEFAULT 'global',
    "siteName" TEXT NOT NULL,
    "siteDescription" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "socials" JSONB NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "heroImageSrc" TEXT NOT NULL,
    "heroImageAlt" TEXT NOT NULL,
    "heroImageBlur" TEXT,
    "heroStatCards" JSONB NOT NULL,
    "aboutLabel" TEXT NOT NULL,
    "aboutTitle" TEXT NOT NULL,
    "aboutDescription" TEXT NOT NULL,
    "aboutImageSrc" TEXT NOT NULL,
    "aboutImageAlt" TEXT NOT NULL,
    "aboutImageBlur" TEXT,
    "aboutBadgeTitle" TEXT,
    "aboutBadgeDesc" TEXT,
    "aboutValues" JSONB NOT NULL,
    "servicesLabel" TEXT NOT NULL,
    "servicesTitle" TEXT NOT NULL,
    "servicesDesc" TEXT NOT NULL,
    "projectsLabel" TEXT NOT NULL,
    "projectsTitle" TEXT NOT NULL,
    "projectsDesc" TEXT NOT NULL,
    "articlesLabel" TEXT NOT NULL,
    "articlesTitle" TEXT NOT NULL,
    "articlesDesc" TEXT NOT NULL,
    "contactTitle" TEXT NOT NULL,
    "contactDesc" TEXT NOT NULL,
    "footerHeadline" TEXT NOT NULL,
    "footerSummary" TEXT NOT NULL,
    "copyright" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "public"."Article"("slug" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "public"."Project"("slug" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "public"."Service"("slug" ASC);
