import { delay, of } from 'rxjs';

export const getArticlesForPage = (page: number) => {
	const fakeData = [page, page, page, page];

	return of(fakeData).pipe(delay(2000));
};
