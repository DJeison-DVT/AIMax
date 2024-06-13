import React from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { hasPreferences } from "../lib/preferences";
import Sidebar from "@/app/dashboard/components/Sidebar";

const recomendations = "Display OpenAI result here";
const recomenTitle = "Python";

function Recommendation() {
	return (
		<div className='flex flex-col'>
			<div className='RecomendationTitle text-white font-inherit text-3xl text-center mt-24 ml-2'>
				{recomenTitle}
				<div className='RecomendationContainer w-[950px] rounded-lg mt-2 ml-12 mr-12'>
					<h4 className='RecomendationText text-white font-inherit text-2xl text-center mt-4'>
						{recomendations}
					</h4>
				</div>
				<div className='flex flex-row justify-between p-5 rounded-lg mt-1 mx-72'>
					<Button>Courses</Button>
					<Button>Books</Button>
				</div>
			</div>
		</div>
	);
}

export interface Entity {
	id: string;
	name: string;
}

const fetchPreferences = async (id) => {
	const response = await fetch(
		`http://localhost:3000/api/preferences/user/${id}`
	);
	const preferences = await response.json();

	if (
		!preferences ||
		!preferences.PreferencesImportance ||
		!preferences.PreferencesReason
	) {
		return null;
	}
	const priorities: Entity[] = preferences.PreferencesImportance.map(
		(item: any) => item.importance
	);
	const reasons: Entity[] = preferences.PreferencesReason.map(
		(item: any) => item.reason
	);

	let interest: Entity[] = [];
	if (preferences.userInterest) {
		interest = preferences.userInterest.map((item: any) => item.interest);
	}
	let knowledge: Entity[] = [];
	if (preferences.userKnowledge) {
		knowledge = preferences.userKnowledge.map((item: any) => item.knowledge);
	}

	return {
		priorities,
		reasons,
		interest,
		knowledge,
	};
};

async function DashboardPage() {
	const session = await auth();

	if (!session || !session.user || !session.user.id) {
		redirect("/");
	}

	if (session.user && session.user.id) {
		const pref = await hasPreferences(session.user.id);

		if (!pref || !pref.id || !pref.userId) {
			redirect(`/initial-preferences/3-things-distraction`);
		}
	}

	const id = session.user.id;
	const preferences = await fetchPreferences(id);

	return (
		<div className='flex bg-fondo p-5 overflow-hidden h-full'>
			<div className='flex-1 flex flex-col'>
				<h3 className='text-white font-bold text-4xl text-center'>
					This Week’s Recommendations
				</h3>
				<div className='flex flex-col justify-around flex-1'>
					<Recommendation />
					<Recommendation />
				</div>
			</div>

			{preferences ? (
				<Sidebar
					priorities={preferences.priorities}
					reasons={preferences.reasons}
					interest={preferences.interest}
					knowledge={preferences.knowledge}
				/>
			) : (
				<div className='w-[500px]'>Loading...</div>
			)}
		</div>
	);
}

export default DashboardPage;
