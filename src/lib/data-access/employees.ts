const employees = ['Josh', 'Joseph', 'Jocelyn', 'Jamal', 'Jack', 'Jean'];

export const getEmployeesBySearchTerm = (searchTerm: string): Promise<string[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log(`Request for ${searchTerm} complete`);
			resolve(
				employees.filter((employee) => employee.toLowerCase().startsWith(searchTerm.toLowerCase()))
			);
		}, Math.floor(Math.random() * (2000 - 50 + 1) + 50));
	});
};
