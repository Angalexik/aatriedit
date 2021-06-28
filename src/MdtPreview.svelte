<script lang="ts">
	export let name: string | null;
	export let text: string;
</script>

<div class="container">
	{#if name}
		<p class="nameContainer"><span class="name">{name}</span></p>
	{/if}
	<p class="text">{text}</p>
</div>

<style>
	.container {
		margin: 20px;
		font-size: 25px;
		font-family: 'AATri', serif;
		height: 7.26em;
	}

	.nameContainer {
		font-size: 0.7em;
		color: white;
		margin: 0;
		position: relative;
		top: 0.7em;
		left: 0.5rem;
	}

	.name {
		background-color: #2b8bbb;
		padding: 0.2em 0.4em;
		border-radius: 0.4em;
		border: 1px solid white;
	}
</style>
