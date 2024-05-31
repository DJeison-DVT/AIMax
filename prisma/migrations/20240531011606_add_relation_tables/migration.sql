/*
  Warnings:

  - You are about to drop the column `easily_distracted` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `importance` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `reasons` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `study_methods` on the `UserPreferences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPreferences" DROP COLUMN "easily_distracted",
DROP COLUMN "importance",
DROP COLUMN "languages",
DROP COLUMN "reasons",
DROP COLUMN "study_methods";

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreferencesLanguage" (
    "languageId" TEXT NOT NULL,
    "preferencesId" TEXT NOT NULL,

    CONSTRAINT "PreferencesLanguage_pkey" PRIMARY KEY ("languageId","preferencesId")
);

-- CreateTable
CREATE TABLE "Importance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Importance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreferencesImportance" (
    "importanceId" TEXT NOT NULL,
    "preferencesId" TEXT NOT NULL,

    CONSTRAINT "PreferencesImportance_pkey" PRIMARY KEY ("importanceId","preferencesId")
);

-- CreateTable
CREATE TABLE "Reason" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Reason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreferencesReason" (
    "reasonId" TEXT NOT NULL,
    "preferencesId" TEXT NOT NULL,

    CONSTRAINT "PreferencesReason_pkey" PRIMARY KEY ("reasonId","preferencesId")
);

-- AddForeignKey
ALTER TABLE "PreferencesLanguage" ADD CONSTRAINT "PreferencesLanguage_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferencesLanguage" ADD CONSTRAINT "PreferencesLanguage_preferencesId_fkey" FOREIGN KEY ("preferencesId") REFERENCES "UserPreferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferencesImportance" ADD CONSTRAINT "PreferencesImportance_importanceId_fkey" FOREIGN KEY ("importanceId") REFERENCES "Importance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferencesImportance" ADD CONSTRAINT "PreferencesImportance_preferencesId_fkey" FOREIGN KEY ("preferencesId") REFERENCES "UserPreferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferencesReason" ADD CONSTRAINT "PreferencesReason_reasonId_fkey" FOREIGN KEY ("reasonId") REFERENCES "Reason"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferencesReason" ADD CONSTRAINT "PreferencesReason_preferencesId_fkey" FOREIGN KEY ("preferencesId") REFERENCES "UserPreferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
