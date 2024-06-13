"use client";

import {
	Recommendation,
	fetchNewRecommendation,
	fetchRecommendation,
} from "@/app/lib/recommendations";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { PreferenceProps } from "../page";
import { Session } from "next-auth";

const recomendations = "Display OpenAI result here";
const recomenTitle = "Python";

function RecommendationCard() {
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

type PreferencePropsWithSession = PreferenceProps & { session: Session };

export default function MainPanel({
	priorities,
	reasons,
	interest,
	knowledge,
	session,
}: PreferencePropsWithSession) {
	const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
	const [recommendationLoading, setRecommendationLoading] = useState(false);

	const getRecommendation = async () => {
		setRecommendationLoading(true);
		const recommendations = await fetchRecommendation(session, {
			priorities,
			reasons,
			interest,
			knowledge,
		});
		console.log(recommendations);
		setRecommendations(recommendations);
		setRecommendationLoading(false);
	};

	const handleNewRecommendation = async () => {
		setRecommendationLoading(true);
		const recommendations = await fetchNewRecommendation(session, {
			priorities,
			reasons,
			interest,
			knowledge,
		});
		setRecommendations(recommendations);
		setRecommendationLoading(false);
	};

	useEffect(() => {
		getRecommendation();
	}, []);

	return (
		<div className='flex-1 flex flex-col'>
			<div className='text-white relative font-bold text-4xl text-center'>
				This Week’s Recommendations
				<button
					onClick={handleNewRecommendation}
					className='absolute right-10 top-0 hover:cursor-pointer hover:bg-black/10 p-3 rounded-full disabled:cursor-not-allowed disabled:text-white/40'
				>
					<RotateCcw />
				</button>
			</div>
			<div className='flex flex-col justify-around flex-1'>
				{/* render json of received recommendation */}
				{recommendationLoading ? (
					<div className='text-white text-center'>Loading...</div>
				) : (
					<div className='text-white text-center'>
						{/* if no reccomendation show some text */}
						{recommendations.length === 0 ? (
							<div>No recommendations available</div>
						) : (
							<div>
								{recommendations.map((recommendation, index) => (
									<div key={index}>{JSON.stringify(recommendation)}</div>
								))}
							</div>
						)}
					</div>
				)}
				{/* <Recommendation />
				<Recommendation /> */}
			</div>
		</div>
	);
}
