import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/db';
import openai from '@/openaiClient';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            try {
                const recommendations = await prisma.recommendation.findMany();
                res.status(200).json(recommendations);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching recommendations' });
            }
            break;
        case 'POST':
            const { userId } = req.body;
            try {
                const user = await prisma.user.findUnique({
                    where: { id: userId },
                    include: { UserPreferences: true }
                });

                if (!user) {
                    res.status(404).json({ error: 'User not found' });
                    return;
                }

                const preferences = user.UserPreferences[0];

                if (!preferences) {
                    res.status(404).json({ error: 'User preferences not found' });
                    return;
                }

                const {
                    languages = [],
                    importance = [],
                    location = '',
                    easily_distracted = false,
                    study_methods = [],
                    special_attention = '',
                    time_goal = '',
                    reasons = [],
                    pronouns = '',
                    identity = ''
                } = preferences;

                const prompt = `
                Based on the following user preferences, generate learning recommendations:

                Languages: ${languages.join(', ')}
                Importance: ${importance.join(', ')}
                Location: ${location}
                Easily Distracted: ${easily_distracted}
                Study Methods: ${study_methods.join(', ')}
                Special Attention: ${special_attention}
                Time Goal: ${time_goal}
                Reasons: ${reasons.join(', ')}
                Pronouns: ${pronouns}
                Identity: ${identity}
                `;

                const chatResponse = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7
                });

                const newRecommendation = await prisma.recommendation.create({
                    data: {
                        userId,
                        subjectId: 'default-subject-id',
                        createdAt: new Date()
                    }
                });

                res.status(201).json(newRecommendation);
            } catch (error) {
                res.status(500).json({ error: 'Error generating recommendation' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
