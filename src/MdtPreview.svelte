<script lang="ts">
	import { names } from './nameStore';

	export let name: number;
	export let text: string;
</script>

<div class="mdtContainer">
	{#if name}
		<p class="nameContainer"><span class="name">{$names?.[name]?.[1] ?? `unknown (${name})`}</span></p>
	{/if}
	<p class="text">{@html text}</p>
</div>

<style>
	.mdtContainer {
		font-size: 24px;
		font-family: 'AATri', serif;
		height: 7.26em;
		position: relative;
	}

	.nameContainer {
		font-size: 0.7em;
		color: white;
		margin: 0;
		position: absolute;
		top: -0.5em;
		left: 0.5rem;
	}

	.name {
		background-color: #2b8bbb;
		padding: 0.2em 0.4em;
		border-radius: 0.4em;
		border: 1px solid white;
	}
</style>
