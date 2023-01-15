<script lang="ts">
	import { getEmployeesBySearchTerm } from '$lib/data-access/employees';
	import { SvelteSubject } from '$lib/utils/subject';
	import { switchMap } from 'rxjs';

	const searchTerm$ = new SvelteSubject('');
	const employees$ = searchTerm$.pipe(
		switchMap((searchTerm) => getEmployeesBySearchTerm(searchTerm))
	);
</script>

<input type="text" bind:value={$searchTerm$} />

{#if $employees$}
	<ul>
		{#each $employees$ as employee}
			<li>{employee}</li>
		{/each}
	</ul>
{/if}
