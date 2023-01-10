<script lang="ts">
	import { getArticlesForPage } from '$lib/data-access/articles';
	import { derived, writable, type Readable } from 'svelte/store';

	const currentPage$ = writable<number>(1);

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

<button on:click={() => currentPage$.update((p => ++p))}>Load more</button>
