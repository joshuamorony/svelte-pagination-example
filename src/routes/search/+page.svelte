<script lang="ts">
	import { getEmployeesBySearchTerm } from '$lib/data-access/employees';
	import { writable, derived, type Readable } from 'svelte/store';

	let searchTerm = writable('');

	let employees: Readable<string[]>;

	employees = derived(searchTerm, ($value, set) => {
		getEmployeesBySearchTerm($value).then(set);
	});
</script>

<input type="text" bind:value={$searchTerm} />

{#if $employees}
	<ul>
		{#each $employees as employee}
			<li>{employee}</li>
		{/each}
	</ul>
{/if}
