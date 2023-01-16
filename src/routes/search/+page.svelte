<script lang="ts">
	import { getEmployeesBySearchTerm } from '$lib/data-access/employees';
	import { writable, derived, type Readable } from 'svelte/store';

	let searchTerm = writable('');

	let employees: Readable<string[]> = derived(searchTerm, ($value, set) => {
		getEmployeesBySearchTerm($value).then(set);
	});
</script>

<h2>Filter employees:</h2>
<input type="text" bind:value={$searchTerm} />

<h2>Results:</h2>
{#if $employees}
	<ul>
		{#each $employees as employee}
			<li>{employee}</li>
		{/each}
	</ul>
{/if}
