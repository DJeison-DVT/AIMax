import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/db';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            try {
                const users = await prisma.user.findMany();
                res.status(200).json(users);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching users' });
            }
            break;
        case 'POST':
            const { name, email, preferences } = req.body;
            try {
                const newUser = await prisma.user.create({
                    data: {
                        name,
                        email,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                });

                // Guardar preferencias del usuario
                const userPreferences = {
                    userId: newUser.id,
                    languages: preferences.languages || [],
                    importance: preferences.importance || [],
                    location: preferences.location || '',
                    easily_distracted: preferences.easily_distracted || false,
                    study_methods: preferences.study_methods || [],
                    special_attention: preferences.special_attention || '',
                    time_goal: preferences.time_goal || '',
                    reasons: preferences.reasons || [],
                    pronouns: preferences.pronouns || '',
                    identity: preferences.identity || '',
                    career: preferences.career || ''
                };

                await prisma.userPreferences.create({
                    data: userPreferences
                });

                res.status(201).json(newUser);
            } catch (error) {
                res.status(500).json({ error: 'Error creating user or saving preferences' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
