import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/db";
import { auth } from "@/auth";

function extract_information(json: { [key: string]: any }) {
	json["studyMethods"] = json["studyMethods"]["selected"];
	json["specialAttention"] =
		["Sí", "si", "Si"].indexOf(json["specialAttention"]) > -1 ? true : false;
	json["programmingLearnLanguages"] =
		json["programmingLearnLanguages"]["selected"];
	json["programmingLanguages"] = json["programmingLanguages"]["selected"];
	json["importance"] = json["selectedOptions"];
	delete json["selectedOptions"];
	json["interests"] = json["programmingLearnLanguages"];
	delete json["programmingLearnLanguages"];
	json["knowledge"] = json["programmingLanguages"];
	json["knowledge"] = json["knowledge"].concat(json["favTech"]);
	//check for repeats

	delete json["programmingLanguages"];
	delete json["favTech"];
	return json;
}

export async function POST(request: Request) {
	try {
		const json = await request.json();
		const data = extract_information(json);

		const session = await auth();
		if (!session || !session.user) {
			return new Response("Unauthorized", { status: 401 });
		}

		const user = await prisma.user.findUnique({
			where: { id: session.user.id },
		});
		if (!user) {
			return new Response("User not found", { status: 404 });
		}
		const responseLang = await fetch(
			"http://localhost:3000/api/preferences/language",
			{
				method: "POST",
				body: JSON.stringify({
					language: data.language,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const { languageIds } = await responseLang.json();

		const responseImportance = await fetch(
			"http://localhost:3000/api/preferences/importance",
			{
				method: "POST",
				body: JSON.stringify({
					importance: data.importance,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const { importanceIds } = await responseImportance.json();

		const reponseReason = await fetch(
			"http://localhost:3000/api/preferences/reason",
			{
				method: "POST",
				body: JSON.stringify({
					reason: data.studyReason,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const { reasonId } = await reponseReason.json();

		const responseInterest = await fetch("http://localhost:3000/api/interest", {
			method: "POST",
			body: JSON.stringify({
				interests: data.interests,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const { interestIds } = await responseInterest.json();

		const responseKnowledge = await fetch(
			"http://localhost:3000/api/knowledge",
			{
				method: "POST",
				body: JSON.stringify({
					knowledge: data.knowledge,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const { knowledgeIds } = await responseKnowledge.json();

		const preferences = await prisma.userPreferences.create({
			data: {
				user: {
					connect: {
						id: session.user.id,
					},
				},

				location: data.studyLocation,
				special_attention: data.specialAttention.toString(),
				time_goal: data.studyGoals,
				pronouns: data.pronouns,
				identity: data.genderIdentify,
			},
		});

		for (let lang of languageIds) {
			await prisma.preferencesLanguage.create({
				data: {
					preferences: {
						connect: {
							id: preferences.id,
						},
					},
					language: {
						connect: {
							id: lang,
						},
					},
				},
			});
		}

		for (let imp of importanceIds) {
			await prisma.preferencesImportance.create({
				data: {
					preferences: {
						connect: {
							id: preferences.id,
						},
					},
					importance: {
						connect: {
							id: imp,
						},
					},
				},
			});
		}

		await prisma.preferencesReason.create({
			data: {
				preferences: {
					connect: {
						id: preferences.id,
					},
				},
				reason: {
					connect: {
						id: reasonId,
					},
				},
			},
		});

		for (let interest of interestIds) {
			await prisma.userInterest.create({
				data: {
					user: {
						connect: {
							id: session.user.id,
						},
					},
					interest: {
						connect: {
							id: interest,
						},
					},
				},
			});
		}

		for (let knowledge of knowledgeIds) {
			await prisma.userKnowledge.create({
				data: {
					user: {
						connect: {
							id: session.user.id,
						},
					},
					knowledge: {
						connect: {
							id: knowledge,
						},
					},
				},
			});
		}
		console.log("Preferences created successfully");

		return new Response(JSON.stringify({ preferences }), { status: 200 });
	} catch (error) {
		console.log("Couldn't process request", error);
		return new Response("Server API Error, login", { status: 500 });
	}
}
