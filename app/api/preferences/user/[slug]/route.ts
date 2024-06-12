import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { UserKnowledge } from "@prisma/client";

export async function GET(
	req: NextRequest,
	{ params }: { params: { slug: string } }
) {
	try {
		const userId = params.slug;

		let userKnowledge: {
			knowledge: { id: string; name: string };
			userId: string;
			knowledgeId: string;
		}[] = [];
		let userInterest: {
			interest: { id: string; name: string };
			userId: string;
			interestId: string;
		}[] = [];

		try {
			userKnowledge = await prisma.userKnowledge.findMany({
				where: { userId: userId },
				include: { knowledge: true },
			});
		} catch (error) {
			console.error("Error fetching user knowledge:", error);
		}

		try {
			userInterest = await prisma.userInterest.findMany({
				where: { userId: userId },
				include: { interest: true },
			});
		} catch (error) {
			console.error("Error fetching user interest:", error);
		}

		let preferences = null;
		try {
			preferences = await prisma.userPreferences.findFirst({
				where: { userId: userId },
				include: {
					PreferencesLanguage: {
						include: { language: true },
					},
					PreferencesImportance: {
						include: { importance: true },
					},
					PreferencesReason: {
						include: { reason: true },
					},
					PreferencesMethod: {
						include: { method: true },
					},
				},
			});

			if (!preferences) {
				return new NextResponse(
					JSON.stringify({ message: "Preference not found" }),
					{
						status: 404,
						headers: { "Content-Type": "application/json" },
					}
				);
			}
		} catch (error) {
			console.error("Error fetching preferences:", error);
			return new NextResponse(
				JSON.stringify({ message: "Error fetching preferences" }),
				{
					status: 500,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		const userPreferences = {
			...preferences,
			userInterest,
			userKnowledge,
		};

		return new NextResponse(JSON.stringify(userPreferences), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("API error:", error);
		return new NextResponse(JSON.stringify({ message: "API error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
