"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	const handleStartClick = () => {
		router.push("/login"); // Ruta a la página de login
	};

	return (
		<main className='w-full h-screen flex flex-col'>
			<div className='bg-custom-yellow bg-cover bg-center h-full flex flex-col items-center justify-center'>
				<div className='grid grid-cols-2 w-full overflow-hidden gap-14'>
					<div className='flex justify-end items-center'>
						<img
							src='/lp-aimax.png'
							className='w-[750px] h-[480px] rounded-3xl '
						/>
					</div>
					<div className='flex justify-start items-center'>
						<div className='flex flex-col justify-center items-center'>
							<h1 className='text-white text-7xl font-light italic mb-4'>
								AIMAX
							</h1>
							<button
								className='bg-custom-orange w-40 font-light italic text-white py-2 px-4 rounded-3xl'
								onClick={handleStartClick}
							>
								START
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
