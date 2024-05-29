-- CreateTable
CREATE TABLE "Knowledge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Knowledge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserKnowledge" (
    "userId" TEXT NOT NULL,
    "knowledgeId" TEXT NOT NULL,

    CONSTRAINT "UserKnowledge_pkey" PRIMARY KEY ("userId","knowledgeId")
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInterest" (
    "userId" TEXT NOT NULL,
    "interestId" TEXT NOT NULL,

    CONSTRAINT "UserInterest_pkey" PRIMARY KEY ("userId","interestId")
);

-- CreateTable
CREATE TABLE "CareerPath" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CareerPath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCareerPath" (
    "userId" TEXT NOT NULL,
    "careerPathId" TEXT NOT NULL,

    CONSTRAINT "UserCareerPath_pkey" PRIMARY KEY ("userId","careerPathId")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "languages" TEXT[],
    "importance" TEXT[],
    "location" TEXT NOT NULL,
    "easily_distracted" BOOLEAN NOT NULL,
    "study_methods" TEXT[],
    "special_attention" TEXT,
    "time_goal" TEXT NOT NULL,
    "reasons" TEXT[],
    "pronouns" TEXT,
    "identity" TEXT,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserKnowledge" ADD CONSTRAINT "UserKnowledge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserKnowledge" ADD CONSTRAINT "UserKnowledge_knowledgeId_fkey" FOREIGN KEY ("knowledgeId") REFERENCES "Knowledge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInterest" ADD CONSTRAINT "UserInterest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInterest" ADD CONSTRAINT "UserInterest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCareerPath" ADD CONSTRAINT "UserCareerPath_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCareerPath" ADD CONSTRAINT "UserCareerPath_careerPathId_fkey" FOREIGN KEY ("careerPathId") REFERENCES "CareerPath"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
