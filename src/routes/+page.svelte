<script lang="ts">
	import { scan, concatMap } from 'rxjs/operators';
	import { getArticlesForPage } from '$lib/data-access/articles';
	import { SvelteSubject } from '$lib/utils/subject';

	const currentPage$ = new SvelteSubject<number>(1);
	const pageData$ = currentPage$.pipe(
		// Get the data for the current page (make sure to get all pages)
		concatMap((currentPage) => getArticlesForPage(currentPage)),
		// Add it to the previous data
		scan((prev, current) => [...prev, ...current])
	);
</script>

<h2>Page loaded: {$currentPage$}</h2>

{$pageData$}

<button on:click={() => currentPage$.next(currentPage$.value + 1)}>Load more</button>
