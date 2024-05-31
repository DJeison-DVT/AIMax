import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { hasPreferences } from "../lib/preferences";

const recomendations = "Recomendations Here lalalalalal";
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

async function DashboardPage() {
	const session = await auth();

	if (!session || !session.user || !session.user.id) {
		redirect("/");
	}

	if (session.user && session.user.id) {
		const pref = await hasPreferences(session.user.id);
		if (!pref) {
			redirect(`/initial-preferences/3-things-distraction`);
		}
	}

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
			<Sidebar session={session.user.id} />
		</div>
	);
}

interface PreferenceCardProps {
	tags: { name: string; id: string }[];
}

function PreferenceCard({ tags }: PreferenceCardProps) {
	return (
		<div>
			<h4 className='interestTitle text-white font-inherit text-xl text-left'>
				Interests
			</h4>
			<div className='interestContainer bg-logo  rounded-lg mt-2 mb-2 p-4'>
				{tags.map((tag, index) => (
					<li
						className='interestText text-white font-inherit text-left ml-2'
						key={index}
					>
						{tag.name}
					</li>
				))}
			</div>
		</div>
	);
}

interface SidebarProps {
	session: string;
}

async function Sidebar({ session }: SidebarProps) {
	const fetchPreferences = async (id: string) => {
		const response = await fetch(
			`http://localhost:3000/api/preferences/user/${id}`
		);
		const data = await response.json();
		return data;
	};

	let importances = [];
	const preferences = await fetchPreferences(session);
	let reasons = [];
	if (preferences) {
		importances = preferences.PreferencesImportance.map(
			(item: any) => item.importance
		);
		reasons = preferences.PreferencesReason.map((item: any) => item.reason);
	}
	return (
		<div className='flex flex-col'>
			<ScrollArea className='w-[500px] flex-1 h-full'>
				<PreferenceCard tags={importances} />
				<PreferenceCard tags={reasons} />
			</ScrollArea>
		</div>
	);
}

export default DashboardPage;
