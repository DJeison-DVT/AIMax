import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"

const recomendations = "Recomendations Here lalalalalal";
const recomenTitle= "Python"


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

function DashboardPage() {
	return (
		<div className='flex bg-fondo p-5 overflow-hidden h-full'>
      <div className="flex-1 flex flex-col">



				<h3 className='text-white font-bold text-4xl text-center'>
					This Week’s Recommendations
				</h3>
          <div className="flex flex-col justify-around flex-1">
          <Recommendation />
          <Recommendation />
          </div>
      </div>
    
			<ScrollAreaDemo />
		</div>
	);
}

const tags = ["Python", "Java"];
const tags2 = [
	"Python Crash Course by Eric Matthes This book is great for beginners, providing a comprehensive introduction to Python programming. It starts with basic concepts and gradually moves to more complex topics, including classes, file handling, and testing. The second part of the book applies what youve learned to specific projects, such as developing a web application or a game. Automate the Boring Stuff with Python by Al Sweigart Ideal for those who want to immediately apply Python to solve real-world problems. This book focuses on writing simple programs to automate tasks such as updating spreadsheets, parsing PDFs, or renaming files, making it particularly useful for office workers, students, and anyone who regularly performs repetitive computer tasks.",
];

function Interest() {
  return (
    <div>
      <h4 className='interestTitle text-white font-inherit text-xl text-left'>
        Interests
      </h4>
      <div className='interestContainer bg-logo  rounded-lg mt-2 mb-2 p-4'>
        {tags.map((tag) => (
          <li
            className='interestText text-white font-inherit text-left ml-2'
            key={tag}
          >
            {tag}
          </li>
        ))}
      </div>
    </div>
  );

}

function ScrollAreaDemo() {
	return (
    <div className="flex flex-col">

		<ScrollArea className='w-[500px] flex-1 h-full'>
      <Interest />
      <Interest />
      <Interest />
      <Interest />
		</ScrollArea> 
          </div>
	);
}



export default DashboardPage;
