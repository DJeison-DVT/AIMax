import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/db';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const recommendations = await prisma.recommendation.findMany();
            res.status(200).json(recommendations);
            break;
        case 'POST':
            const { userId, subjectId } = req.body;
            const newRecommendation = {
                userId,
                subjectId,
                createdAt: new Date()
            };
            const createdRecommendation = await prisma.recommendation.create({ data: newRecommendation });
            res.status(201).json(createdRecommendation);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
