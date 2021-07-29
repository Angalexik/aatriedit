<script lang="ts">
	import { onMount } from 'svelte';
	import type { tabItem } from './types';

	export let items: tabItem[] = [];
	export let activeTabValue: number;

	onMount(() => {
		// Set default tab value
		if (items.length) {
			activeTabValue = items[0].value;
		}
	});

	const handleClick = (tabValue: number) => () => (activeTabValue = tabValue);
</script>

<ul>
	{#each items as item}
		<li class={activeTabValue === item.value ? 'active' : 'inactive'}>
			<span on:click={handleClick(item.value)} role="button" aria-pressed={activeTabValue === item.value ? 'true' : 'false'}>{item.label}</span>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		padding-left: 0;
		padding-bottom: 0;
		list-style: none;
		border-bottom: 1px solid #dee2e6;
	}

	span {
		border: 1px solid transparent;
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
		display: block;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}

	span:hover {
		border-color: #e9ecef #e9ecef #dee2e6;
	}

	li.active > span {
		color: #495057;
		background-color: #fff;
		border-color: #dee2e6 #dee2e6 #fff;
	}
</style>
