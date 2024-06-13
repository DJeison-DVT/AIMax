import { ScrollArea } from "@/components/ui/scroll-area";
import { Entity } from "../page";

interface PreferenceCardProps {
	tags: { name: string; id: string }[];
	title: string;
}

function PreferenceCard({ tags, title }: PreferenceCardProps) {
	return (
		<div>
			<div className='interestTitle text-white font-inherit text-xl text-left'>
				{title}
			</div>
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

export interface SidebarProps {
	priorities: Entity[];
	reasons: Entity[];
	interest: Entity[];
	knowledge: Entity[];
}

async function Sidebar({
	priorities,
	reasons,
	interest,
	knowledge,
}: SidebarProps) {
	return (
		<div className='flex flex-col'>
			<ScrollArea className='w-[500px] flex-1 h-full'>
				<PreferenceCard tags={priorities} title='Priorities' />
				<PreferenceCard tags={reasons} title='Reasons for Learning' />
				<PreferenceCard tags={interest} title='Interests' />
				<PreferenceCard tags={knowledge} title='Knowledge' />
			</ScrollArea>
		</div>
	);
}

export default Sidebar;
