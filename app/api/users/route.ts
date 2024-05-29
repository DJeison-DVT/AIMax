import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/db';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const users = await prisma.user.findMany();
            res.status(200).json(users);
            break;
        case 'POST':
            const { name, email, password, career } = req.body;
            const newUser = {
                name,
                email,
                password,
                career,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            const createdUser = await prisma.user.create({ data: newUser });
            res.status(201).json(createdUser);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
