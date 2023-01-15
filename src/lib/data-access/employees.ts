import { delay, of, tap } from 'rxjs';

const employees = ['Josh', 'Joseph', 'Jocelyn', 'Jamal', 'Jack', 'Jean'];

export const getEmployeesBySearchTerm = (searchTerm: string) => {
	return of(
		employees.filter((employee) => employee.toLowerCase().startsWith(searchTerm.toLowerCase()))
	).pipe(
		delay(Math.floor(Math.random() * (2000 - 50 + 1) + 50)),
		tap(() => console.log(`Request for ${searchTerm} complete`))
	);
};
