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

export { hasPreferences };
