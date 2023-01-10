<script lang="ts">
	import { getArticlesForPage } from '$lib/data-access/articles';
	import { derived, writable, type Readable } from 'svelte/store';

	/*
	import { scan, concatMap } from 'rxjs/operators';
	import { SvelteSubject } from '$lib/utils/subject';

	const currentPage$ = new SvelteSubject<number>(1);

	const pageData$ = currentPage$.pipe(
		// Get the data for the current page (make sure to get all pages)
		concatMap((currentPage) => getArticlesForPage(currentPage)),
		// Add it to the previous data
		scan((prev, current) => [...prev, ...current])
	);
	*/

	const currentPage$ = (() => {
		const { set, update, subscribe } = writable<number>(1);
		return {
			set,
			update,
			subscribe,
			next: () => update((p) => ++p)
		};
	})();

	let pageData$: Readable<number[]>;

	pageData$ = derived<typeof currentPage$, number[]>(currentPage$, (values, set) => {
		const { unsubscribe } = getArticlesForPage(values).subscribe((article) =>
			set($pageData$ ? [...$pageData$, ...article] : article)
		);
		return unsubscribe.bind(unsubscribe);
	});
</script>

<h2>Page loaded: {$currentPage$}</h2>

{$pageData$}

<button on:click={() => currentPage$.next()}>Load more</button>

<!--<button on:click={() => currentPage$.next(currentPage$.value + 1)}>Load more</button>-->
