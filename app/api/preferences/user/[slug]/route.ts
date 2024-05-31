import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

export async function GET(
	req: NextRequest,
	{ params }: { params: { slug: string } }
) {
	try {
		const userId = params.slug;
		let preferences;
		try {
			preferences = await prisma.userPreferences.findFirst({
				where: { userId: userId },
				include: {
					PreferencesLanguage: {
						include: {
							language: true,
						},
					},
					PreferencesImportance: {
						include: {
							importance: true,
						},
					},
					PreferencesReason: {
						include: {
							reason: true,
						},
					},
				},
			});

			if (!preferences) {
				return new Response(
					JSON.stringify({ message: "Preference not found" }),
					{
						status: 404,
						headers: { "Content-Type": "application/json" },
					}
				);
			}
		} catch (error) {
			return new Response(
				JSON.stringify({ message: "Error fetching preferences" }),
				{
					status: 500,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		return new Response(JSON.stringify(preferences), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify({ message: "API error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
