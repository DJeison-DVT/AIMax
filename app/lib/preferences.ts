async function hasPreferences(user: string) {
	try {
		const response = await fetch(
			`http://localhost:3000/api/preferences/user/${user}`
		);
		const { id, userId } = await response.json();
		return { id, userId };
	} catch (error) {
		console.error(error);
	}
}

async function changePreferences(user: string, preferences: any) {
	try {
		const response = await fetch(
			`http://localhost:3000/api/preferences/user/${user}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: user,
					...preferences,
				}),
			}
		);

		return response.status;
	} catch (error) {
		console.error(error);
	}
}

export { hasPreferences, changePreferences };
