"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { hasPreferences } from "../lib/preferences";

function Recommendation({ title, recommendations }) {
  return (
    <div className='flex flex-col'>
      <div className='RecomendationTitle text-white font-inherit text-3xl text-center mt-24 ml-2'>
        {title}
        <div className='RecomendationContainer w-[950px] rounded-lg mt-2 ml-12 mr-12'>
          <h4 className='RecomendationText text-white font-inherit text-2xl text-center mt-4'>
            {recommendations}
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

    if (!pref || !pref.id || !pref.userId) {
      redirect(`/initial-preferences/3-things-distraction`);
    }
  }

  const [recommendations, setRecommendations] = useState([]);
  const [studyResources, setStudyResources] = useState([]);
  const [userPreferences, setUserPreferences] = useState({
    interests: [],
    knowledge: [],
    reasons: [],
    priorities: [],
    language: "English",
  });

  useEffect(() => {
    const postData = async () => {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPreferences),
      });

      if (response.ok) {
        const data = await response.json();
        fetchRecommendations(data.recommendations[0].userId);
      }
    };

    const fetchRecommendations = async (userId) => {
      const response = await fetch(`/api/recommendations/${userId}`);
      const data = await response.json();
      setRecommendations(data.recommendations);
      const resources = data.recommendations.flatMap(recommendation => recommendation.subject.resources);
      setStudyResources(resources);
    };

    postData();
  }, [userPreferences]);

  return (
    <div className='flex bg-fondo p-5 overflow-hidden h-full'>
      <div className='flex-1 flex flex-col '>
        <h3 className='text-white font-bold text-4xl text-center'>
          This Week’s Recommendations
        </h3>
        <div className='flex flex-col justify-around flex-1'>
          {recommendations.map((rec, index) => (
            <Recommendation
              key={index}
              title={rec.subject.name}
              recommendations={rec.subject.description}
            />
          ))}
          <Separator />
          <div className='flex flex-col'>
            {studyResources.map((resource, index) => (
              <div key={index} className='mb-4'>
                <h4 className='text-white'>{resource.name}</h4>
                <p className='text-white'>{resource.description}</p>
                <a className='text-blue-400' href={resource.url} target='_blank' rel='noopener noreferrer'>
                  {resource.url}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Sidebar session={session.user.id} setUserPreferences={setUserPreferences} />
    </div>
  );
}

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

interface SidebarProps {
  session: string;
  setUserPreferences: (preferences: any) => void;
}

async function Sidebar({ session, setUserPreferences }: SidebarProps) {
  const fetchPreferences = async (id: string) => {
    const response = await fetch(
      `http://localhost:3000/api/preferences/user/${id}`
    );
    const data = await response.json();
    return data;
  };

  let importances = [];
  const preferences = await fetchPreferences(session);

  if (
    !preferences ||
    !preferences.PreferencesImportance ||
    !preferences.PreferencesReason
  ) {
    return null;
  }
  let reasons = [];
  importances = preferences.PreferencesImportance.map(
    (item: any) => item.importance
  );
  reasons = preferences.PreferencesReason.map((item: any) => item.reason);

  let userInterest;
  if (preferences.userInterest) {
    userInterest = preferences.userInterest.map((item: any) => item.interest);
  }
  let userKnowledge;
  if (preferences.userKnowledge) {
    userKnowledge = preferences.userKnowledge.map(
      (item: any) => item.knowledge
    );
  }

  useEffect(() => {
    setUserPreferences({
      interests: userInterest,
      knowledge: userKnowledge,
      reasons: reasons,
      priorities: importances,
      language: "English",
    });
  }, [preferences]);

  return (
    <div className='flex flex-col'>
      <ScrollArea className='w-[500px] flex-1 h-full'>
        {preferences.userInterest && (
          <PreferenceCard tags={userInterest} title='Interests' />
        )}
        {preferences.userKnowledge && (
          <PreferenceCard tags={userKnowledge} title='Knowledge' />
        )}
        <PreferenceCard tags={importances} title='Important stuff' />
        <PreferenceCard tags={reasons} title='Motivation' />
      </ScrollArea>
    </div>
  );
}

function separator() {
  return (
    <div className='flex flex-col'>
      <Separator />
    </div>
  );
}

export default DashboardPage;
