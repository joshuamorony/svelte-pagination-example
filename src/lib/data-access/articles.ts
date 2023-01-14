import { delay, of } from 'rxjs';

export const getArticlesForPage = (page: number) => {
	const fakeData = [page, page, page, page];

	return of(fakeData).pipe(delay(Math.floor(Math.random() * (2000 - 50 + 1) + 50)));
};
